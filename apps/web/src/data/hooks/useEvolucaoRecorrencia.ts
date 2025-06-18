import { core } from "../../adapters";
import { fn } from "utils";
import { RecorrenciaDTO, TransacaoDTO } from "adapters";
import { TipoOperacao } from "core";
import { useState, useEffect } from "react";
import useCentralDeAcesso from "./useCentralDeAcesso";
import useDataRef from "./useDataRef";
import useExtrato from "./useExtrato";
import useApi from "./useApi";
import useCoreFacade from "./useCoreFacade";

interface EvolucaoRecorrencia {
  id: string;
  transacoes: TransacaoDTO[];
}

export default function useEvolucaoRecorrencia() {
  const { dataRef } = useDataRef();
  const { extratos } = useExtrato();
  const { usuario } = useCentralDeAcesso();

  const [idsSelecionados, setIdsSelecionados] = useState<string[]>([]);
  const [recorrencias, setRecorrencias] = useState<RecorrenciaDTO[]>([]);
  const [evolucoes, setEvolucoes] = useState<EvolucaoRecorrencia[]>([]);
  const [grupos, setGrupos] = useState<any[]>([]);

  const core2 = useCoreFacade();

  useEffect(() => {
    consultarRecorrencias();
  }, [usuario]);

  useEffect(() => {
    consolidarDados();
  }, [evolucoes, idsSelecionados]);

  useEffect(() => {
    consultarEvolucoes(idsSelecionados);
  }, [dataRef]);

  async function consultarRecorrencias() {
    if (!usuario) return;
    const recs = await core2.extrato.consultarRecorrencias(usuario);
    setRecorrencias(recs);
  }

  async function consultarEvolucoes(ids: string[]) {
    if (!usuario) return;
    setIdsSelecionados(ids);

    const novasEvolucoes = await Promise.all(
      ids.map(async (id) => {
        const transacoes = await core.extrato.relatorioEvolucaoRecorrencia(
          extratos,
          id,
        );
        return { id, transacoes };
      }),
    );
    setEvolucoes(novasEvolucoes);
  }

  function consolidarDados() {
    const ids = [...idsSelecionados];
    ids.length > 1 && ids.push("");
    const grupos = ids.map((id) => {
      const dados = datas().map((data) => {
        return {
          x: fn.dtfmt.data(data).mmm.slash.yyyy.valor,
          y: valorPorMes(data, id),
        };
      });
      return { titulo: tituloPorId(id), dados };
    });
    setGrupos(grupos);
  }

  function tituloPorId(id: string) {
    const evol = evolucoes.find((e) => e.id === id);
    return evol?.transacoes?.[0]?.nome ?? "Todos";
  }

  function valorPorMes(data: Date, id: string) {
    return evolucoes
      .filter((evol) => !id || evol.id === id)
      .map((evol) => {
        if (!idsSelecionados.includes(evol.id)) return 0;
        const transacao = evol.transacoes.find((t) =>
          fn.dt.mesmoMes(t.data, data),
        );

        if (!transacao) return 0;
        return (
          (transacao.valor ?? 0) *
          (transacao.operacao === TipoOperacao.RECEITA ? 1 : -1)
        );
      })
      .reduce((t, v) => t + v, 0);
  }

  function datas() {
    return fn.dt.ultimos12Meses(dataRef);
  }

  return {
    recorrencias,
    idsSelecionados,
    grupos,
    selecionarRecorrencias: consultarEvolucoes,
  };
}

function transformarDatas(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(transformarDatas);
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
        novoObj[chave] = transformarDatas(valor);
      }
    }
    return novoObj;
  }

  return obj;
}
