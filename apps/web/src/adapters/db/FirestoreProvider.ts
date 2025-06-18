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

export default class FirestoreProvider implements ProvedorDados {
  async salvar(caminho: string, entidade: any, id?: string): Promise<any> {
    const db = getFirestore(app);
    const docRef = doc(db, caminho, id ?? entidade.id).withConverter(
      this.conversor(),
    );
    await setDoc(docRef, entidade);
    return entidade;
  }

  async salvarAtribs(
    caminho: string,
    id: string,
    attributes: any,
  ): Promise<void> {
    const db = getFirestore(app);
    const docRef = doc(db, caminho, id);
    const exists = (await getDoc(docRef)).exists();
    exists ? updateDoc(docRef, attributes) : setDoc(docRef, attributes);
  }

  async salvarTodos(caminhos: string[], entidades: any[]): Promise<void> {
    if (caminhos.length !== entidades.length) throw new Error("bad arguments");

    const db = getFirestore(app);
    const batch = writeBatch(db);

    entidades.forEach((entidade, i) => {
      const docRef = doc(db, caminhos[i]!, (entidade as any)?.id).withConverter(
        this.conversor(),
      );
      const entidadeFinal = this._updateDate(entidade);
      batch.set(docRef, entidadeFinal);
    });

    await batch.commit();
  }

  async existe(caminho: string, id: string): Promise<boolean> {
    const db = getFirestore(app);
    const docRef = doc(db, caminho, id);
    return (await getDoc(docRef)).exists();
  }

  async buscarTodos(
    caminho: string,
    orderByAtt?: string,
    direction?: OrderByDirection,
  ): Promise<any[]> {
    const db = getFirestore(app);
    const colRef = collection(db, caminho).withConverter(this.conversor());
    const filtros: QueryConstraint[] = [];
    const ordem = orderByAtt ? [orderBy(orderByAtt, direction)] : [];

    const qry = query(colRef, ...filtros, ...ordem);
    const resultado = await getDocs(qry);
    return (
      resultado.docs.map((doc) => doc.data()).filter((d) => !d.deletedAt) ?? []
    );
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

  async buscarPor(
    caminho: string,
    filtros: Filtro[],
    orderByAtt?: string,
    direction?: OrderByDirection,
  ): Promise<any[]> {
    const db = getFirestore(app);
    const colRef = collection(db, caminho).withConverter(this.conversor());

    const whereFiltros =
      filtros?.map((f) => where(f.attribute, f.op, f.value)) ?? [];
    const order = orderByAtt ? [orderBy(orderByAtt, direction)] : [];

    const qry = query(colRef, ...whereFiltros, ...order);
    const resultado = await getDocs(qry);
    return resultado.docs.map((doc) => doc.data()) ?? [];
  }

  async buscarPorId(caminho: string, id: string): Promise<any | null> {
    if (!id) return null;
    const db = getFirestore(app);
    const docRef = doc(db, caminho, id).withConverter(this.conversor());
    const resultado = await getDoc(docRef);
    return resultado.data();
  }

  async buscarPorIds(caminho: string, ids: string[]): Promise<any[]> {
    if (!ids || ids.length === 0) return [];
    const db = getFirestore(app);
    const colRef = collection(db, caminho).withConverter(this.conversor());

    // Firebase só permite consultar 10 elementos dentro do "in"
    const queries = this._splitInGroupsOf(10, ids).map(async (ids) => {
      const qry = query(colRef, where("id", "in", ids));
      const resultado = await getDocs(qry);
      return resultado.docs.map((doc) => doc.data()) ?? [];
    });

    const datas = await Promise.all(queries);
    return datas.flatMap((d) => d);
  }

  async excluir(caminho: string, id: string): Promise<boolean> {
    if (!id) return false;
    const db = getFirestore(app);
    const docRef = doc(db, caminho, id).withConverter(this.conversor());

    const fromDb = await getDoc(docRef);
    if (!fromDb.exists()) return false;
    await deleteDoc(docRef);
    return true;
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

  async executarTodos(comandos: ComandoBatch[]): Promise<void> {
    const db = getFirestore(app);
    const batch = writeBatch(db);

    comandos.forEach((comando) => {
      const id = comando.id ?? (comando.entidade as any)?.id;
      const docRef = doc(db, comando.caminho, id).withConverter(
        this.conversor(),
      );
      comando.tipo === "excluir"
        ? batch.delete(docRef)
        : batch.set(docRef, comando.entidade);
    });

    await batch.commit();
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
}
