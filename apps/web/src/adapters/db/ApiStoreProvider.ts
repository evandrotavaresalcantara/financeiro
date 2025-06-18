import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { app } from "../config/app";
import { fn } from "utils";
import { ProvedorDados, Pagina, Filtro, ComandoBatch } from "adapters";
import useApi from "@/data/hooks/useApi";
import { Resultado } from "core";
import { ConfigEntidade, configEntidades } from "../../data/constants/endpoint";

export default class ApiStoreProvider implements ProvedorDados {
  constructor(private api: ReturnType<typeof useApi>) {}
  async existe(caminho: string, id: string): Promise<boolean> {
    const rota = this.obterEndpoint(caminho, "existe");
    const endpoint = rota.replace(":id", id);
    const resposta = (await this.api.httpGet(endpoint)).json;

    return resposta.existe;
  }
  async buscarPorId(caminho: string, id: string): Promise<any | null> {
    const rota = this.obterEndpoint(caminho, "buscarPorId");
    const endpoint = rota.replace(":id", id);
    const respostaApi = await this.api.httpGet(endpoint);
    return respostaApi.sucesso ? this.transformarDatas(respostaApi.json) : null;
  }
  async buscarPor(
    caminho: string,
    filtros: Filtro[],
    orderByAtt?: string,
    direction?: OrderByDirection,
  ): Promise<any[]> {
    const rota = this.obterEndpoint(caminho, "buscarPor");
    const [{ value: data }] = filtros;
    const dataIso = new Date(data).toISOString();
    const endpoint = `${rota}?data=${dataIso}`;
    const respostaApi = (await this.api.httpGet(endpoint)).json;
    const resposta = this.transformarDatas(respostaApi);
    return resposta;
  }
  async buscarTodos(
    caminho: string,
    orderByAtt?: string,
    direction?: OrderByDirection,
  ): Promise<any[]> {
    const endpoint = this.obterEndpoint(caminho, "buscarTodos");
    const respostaApi = (await this.api.httpGet(endpoint)).json;
    const resposta = this.transformarDatas(respostaApi);
    return resposta;
  }
  async buscarPorIds(caminho: string, ids: string[]): Promise<any[]> {
    if (!ids || ids.length === 0) return [];

    const endpoint = this.obterEndpoint(caminho, "buscarPorIds");
    const respostaApi = (await this.api.httpPost(endpoint, { ids })).json;
    const resposta = this.transformarDatas(respostaApi);
    return resposta;
  }
  async salvarTodos(caminhos: string[], entidades: any[]): Promise<void> {
    const endpoint = this.obterEndpoint(caminhos[0], "salvarTodos");
    const nomeEntidade = this.obterConfigEntidade(caminhos[0]);
    const payload = {
      [nomeEntidade.chaveColecao]: entidades,
    };
    await this.api.httpPost(endpoint, entidades);
  }
  async salvarAtribs(
    caminho: string,
    id: string,
    attributes: any,
  ): Promise<void> {
    const rota = this.obterEndpoint(caminho, "salvarAtribs");
    const endpoint = rota.replace(":id", id);
    const atributos = { ...attributes, id };
    const payload = { atributos };
    await this.api.httpPost(endpoint, payload);
  }
  async executarTodos(comandos: ComandoBatch[]): Promise<void> {
    let caminhos: string[] = [];
    let entidades: any[] = [];

    comandos.forEach((c) => {
      caminhos.push(c.caminho);
      entidades.push(c.entidade);
    });
    const endpoint = this.obterEndpoint(caminhos[0], "executarTodos");

    await this.api.httpPost(endpoint, entidades);
  }
  async salvar(caminho: string, entidade: any, id?: string): Promise<any> {
    if (!(this.obterConfigEntidade(caminho).chave === "extrato")) {
    }
    const rota = this.obterEndpoint(caminho, "salvar");
    const endpoint = rota.replace(":id", entidade.id);
    const nomeEntidade = this.obterConfigEntidade(caminho);
    const payload = {
      [nomeEntidade.chave]: entidade,
    };
    await this.api.httpPut(endpoint, entidade);
  }
  async excluir(caminho: string, id: string): Promise<boolean> {
    const rota = this.obterEndpoint(caminho, "excluir");
    const endpoint = `${rota}/${id}`;

    const respota = await this.api.httpDelete(endpoint);
    if (respota.sucesso) return true;
    return false;
  }

  async excluirTodos(caminho: string, ids: string[]): Promise<void> {
    const db = getFirestore(app);
    const batch = writeBatch(db);

    ids.forEach((id) => {
      const docRef = doc(db, caminho, id);
      batch.delete(docRef);
    });

    await batch.commit();
  }
  async buscarPagina(
    caminho: string,
    orderByAtt: string,
    direction: OrderByDirection,
    qty?: number,
    lastValues?: any,
  ): Promise<Pagina> {
    const db = getFirestore(app);
    const colRef = collection(db, caminho).withConverter(this.conversor());

    const srtAfter = lastValues ? [startAfter(lastValues)] : [];
    const order = orderByAtt ? [orderBy(orderByAtt, direction)] : [];

    const qry = query(colRef, ...order, ...srtAfter, limit(qty ?? 20));
    const resultado = await getDocs(qry);
    const data: any[] = resultado.docs.map((doc) => doc.data()) ?? [];

    return {
      dados: data,
      proximo: () =>
        this.buscarPagina(
          caminho,
          orderByAtt,
          direction,
          qty,
          data[data.length - 1],
        ),
    };
  }

  private _splitInGroupsOf(qty: number, array: any[]): any[] {
    return [...array].reduce((groups, id, i) => {
      const groupId = Math.floor(i / qty);
      const group = groups[groupId] ?? [];
      group.push(id);
      groups[groupId] = group;
      return groups;
    }, []);
  }

  private _updateDate(entidade: any) {
    return entidade?.updatedAt
      ? entidade.clone?.({
          updatedAt: new Date(),
        }) ?? entidade
      : entidade;
  }

  private conversor() {
    return {
      toFirestore: function (entidade: any) {
        return fn.obj.undefinedParaNull(entidade);
      },
      fromFirestore: function (snapshot: DocumentSnapshot, options: any): any {
        const dadosPuro: any = snapshot?.data(options);
        const dados = fn.dt.converterDataFS(dadosPuro);
        return dados;
      },
    };
  }

  private obterConfigEntidade(caminho: string): ConfigEntidade {
    const prefixo = caminho.split("/")[0];
    const config = configEntidades[prefixo];

    if (!config) {
      throw new Error(`Configuração não encontrada para o caminho: ${caminho}`);
    }

    return config;
  }

  private obterEndpoint(
    caminho: string,
    metodo: keyof ConfigEntidade["endpoints"],
  ): string {
    let config = this.obterConfigEntidade(caminho);
    let endpoint: string;

    if (config.chave === "extrato") {
      const prefixo = caminho.split("/")[0];
      const sufixo = caminho.split("/")[2];
      const caminhoExtrato = `${prefixo}${sufixo}`;
      config = this.obterConfigEntidade(caminhoExtrato);
      endpoint = config.endpoints[metodo];
    } else {
      endpoint = config.endpoints[metodo];
    }

    if (!endpoint) {
      throw new Error(
        `Endpoint não definido para o método "${metodo}" no caminho: ${caminho}`,
      );
    }
    return endpoint;
  }

  private transformarDatas(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformarDatas(item));
    }

    if (obj !== null && typeof obj === "object") {
      const novoObj: any = {};
      for (const chave in obj) {
        const valor = obj[chave];
        if (
          typeof valor === "string" &&
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(valor)
        ) {
          novoObj[chave] = new Date(valor);
        } else {
          novoObj[chave] = this.transformarDatas(valor);
        }
      }
      return novoObj;
    }

    return obj;
  }
}

/*
  private obterConfigEntidade(caminho: string): ConfigEntidade {
    const prefixo = caminho.split("/")[0];
    const config = configEntidades[prefixo];

    if (!config) {
      throw new Error(`Configuração não encontrada para o caminho: ${caminho}`);
    }

    return config;
  }

  private obterEndpoint(
    caminho: string,
    metodo: keyof ConfigEntidade["endpoints"],
  ): string {
    const config = this.obterConfigEntidade(caminho);
    const endpoint = config.endpoints[metodo];

    if (!endpoint) {
      throw new Error(
        `Endpoint não definido para o método "${metodo}" no caminho: ${caminho}`,
      );
    }

    return endpoint;
  }


  const endpoint = this.obterEndpoint(caminho, "salvarTodos");
    const nomeEntidade = this.obterConfigEntidade(caminho);
    const payload = {
      [nomeEntidade.chaveColecao]: nomeEntidade,
    };
*/
