"use client";
import { core } from "../../adapters";
import {
  CartaoDTO,
  CategoriaDTO,
  ContaDTO,
  ExtratoDTO,
  FiltroExtratoDTO,
  RecorrenciaDTO,
  RegistroDTO,
} from "adapters";
import { fn } from "utils";
import { createContext, useEffect, useState } from "react";
import { obterIcone } from "../constants/iconesFiltro";
import GrupoFiltro from "../model/GrupoFiltro";
import useCartoes from "../hooks/useCartoes";
import useCategorias from "../hooks/useCategorias";
import useCentralDeAcesso from "../hooks/useCentralDeAcesso";
import useContas from "../hooks/useContas";
import useDataRef from "../hooks/useDataRef";
import useProcessamento from "../hooks/useProcessamento";
import useCoreFacade from "../hooks/useCoreFacade";

export interface ExtratoContextProps {
  alternarExibirFiltros: () => void;
  alternarFiltro: (filtro: FiltroExtratoDTO) => void;
  consultarRecorrencia: (id: string) => Promise<RecorrenciaDTO | null>;
  excluirRegistro: (registro: RegistroDTO) => Promise<void>;
  exibirFiltros: boolean;
  extrato: ExtratoDTO | null;
  extratoFiltrado: ExtratoDTO | null;
  extratos: ExtratoDTO[];
  extratoSubcategoria: ExtratoDTO | null;
  filtroEstaSelecionado: (filtro: FiltroExtratoDTO) => boolean;
  filtrosAgrupados: GrupoFiltro[];
  filtrosSelecionados: FiltroExtratoDTO[];
  processando: boolean;
  salvarRegistro: (registro: RegistroDTO) => Promise<void>;
}

const ExtratoContext = createContext<ExtratoContextProps>({} as any);

export function ExtratoProvider(props: any) {
  const { usuario, usuarioConfig, atualizarUsuarioConfig } =
    useCentralDeAcesso();
  const { contas } = useContas();
  const { cartoes } = useCartoes();
  const { categorias } = useCategorias();
  const { dataRef } = useDataRef();
  const { processando, iniciar, finalizar } = useProcessamento();

  const [extrato, setExtrato] = useState<ExtratoDTO | null>(null);
  const [extratos, setExtratos] = useState<ExtratoDTO[]>([]);
  const [extratoFiltrado, setExtratoFiltrado] = useState<ExtratoDTO | null>(
    null,
  );
  const [extratoSubcategoria, setExtratoSubcategoria] =
    useState<ExtratoDTO | null>(null);

  const [exibirFiltros, setExibirFiltros] = useState<boolean>(false);
  const [filtrosUsuario, setFiltrosUsuario] = useState<string[]>([]);
  const [filtrosAgrupados, setFiltrosAgrupados] = useState<GrupoFiltro[]>([]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<
    FiltroExtratoDTO[]
  >([]);

  const core2 = useCoreFacade();

  useEffect(() => {
    _buscarExtratos(true);
  }, [dataRef, usuario]);

  useEffect(() => {
    _carregarFiltros();
  }, [cartoes, categorias, contas, filtrosUsuario, usuario]);

  useEffect(() => {
    _filtrarExtrato();
  }, [filtrosSelecionados, extratos]);

  useEffect(() => {
    if (!usuarioConfig) return;
    setFiltrosUsuario(usuarioConfig?.filtros ?? []);
    setExibirFiltros(usuarioConfig?.exibirFiltros ?? false);
  }, [usuarioConfig]);

  async function salvarRegistro(registro: RegistroDTO) {
    if (!usuario) return;

    if (registro.tipo === "recorrencia") {
      await core2.extrato.salvarRecorrencia(usuario, {
        ...registro.recorrencia,
        transacao: registro.transacao,
      });
    } else if (extrato) {
      await core2.extrato.salvarTransacao(usuario, extrato, registro.transacao);
    }
    await _buscarExtratos();
  }

  async function excluirRegistro(registro: RegistroDTO) {
    if (!usuario) return;

    if (registro.tipo === "recorrencia" && registro.recorrencia?.id) {
      await core2.extrato.excluirRecorrencia(usuario, registro.recorrencia.id);
    } else if (extrato) {
      const transacao = registro.transacao;
      await core2.extrato.excluirTransacao(usuario, extrato, transacao);
    }
    await _buscarExtratos();
  }
  async function consultarRecorrencia(recorrenciaId: string) {
    if (!usuario) return null;

    const recorrencia = core2.extrato.consultarRecorrencia(
      usuario,
      recorrenciaId,
    );
    return recorrencia;
  }

  function alternarFiltro(filtro: FiltroExtratoDTO) {
    if (!filtrosUsuario) return;
    const remover = filtrosUsuario.includes(filtro.id);
    const outrosFiltros = filtrosUsuario.filter((id) => {
      const filtroRemovido = remover && id === filtro.id;
      const filtroEquivalente =
        !remover && _prioridadePorId(id) === filtro.prioridade;
      return !filtroRemovido && !filtroEquivalente;
    });
    const filtros = remover ? outrosFiltros : [...outrosFiltros, filtro.id];
    setFiltrosUsuario(filtros);
    atualizarUsuarioConfig({ filtros, exibirFiltros: true });
  }

  function filtroEstaSelecionado(filtro: FiltroExtratoDTO): boolean {
    return filtrosUsuario?.includes(filtro.id) ?? false;
  }

  function alternarExibirFiltros() {
    const exibir = !exibirFiltros;
    setExibirFiltros(exibir);
    atualizarUsuarioConfig({ exibirFiltros: exibir });
  }

  async function _buscarExtratos(iniciarProcessamento = false) {
    if (!usuario || !dataRef) return;
    try {
      iniciarProcessamento && iniciar();

      const anoPassado = fn.dt.subtrairMeses(dataRef, 11);
      const datas = fn.dt.mesesEntre(anoPassado, dataRef);

      const extratos = await core2.extrato.consultarTodos(usuario, datas);

      const extratosOrdenados = extratos.sort(
        (e1: ExtratoDTO, e2: ExtratoDTO) =>
          e1.data.getTime() - e2.data.getTime(),
      );
      setExtratos(extratosOrdenados);
      setExtrato(
        extratos.find((e: ExtratoDTO) => fn.dt.mesmoMes(e.data, dataRef)) ??
          null,
      );
    } catch (error) {
      console.error(error);
    } finally {
      finalizar();
    }
  }

  async function _carregarFiltros() {
    if (!contas || !cartoes || !categorias || !filtrosUsuario) return;
    const filtrosAgrupados = await _gerarFiltros(cartoes, categorias, contas);
    const filtrosSelecionados = filtrosAgrupados
      .flatMap((grupo) => grupo.filtros)
      .filter((f) => filtrosUsuario.includes(f.id));

    setFiltrosAgrupados(filtrosAgrupados);
    setFiltrosSelecionados(filtrosSelecionados);
  }

  async function _filtrarExtrato() {
    if (!filtrosAgrupados?.length) await _carregarFiltros();
    if (!extrato) return;

    const extratoFiltrado = await core.extrato.filtarExtrato(
      extrato,
      filtrosSelecionados,
    );

    setExtratoFiltrado(extratoFiltrado);

    const filtro = _filtroPorId("AgruparPorSubcategoria");
    if (!filtro) return;

    const extratoSubcategoria = await core.extrato.filtarExtrato(extrato, [
      filtro!,
    ]);
    setExtratoSubcategoria(extratoSubcategoria);
  }

  async function _gerarFiltros(
    cartoes: CartaoDTO[],
    categorias: CategoriaDTO[],
    contas: ContaDTO[],
  ): Promise<GrupoFiltro[]> {
    const filtros = await core.extrato.consultarFiltrosExtrato(
      cartoes,
      categorias,
      contas,
    );
    return filtros.reduce((grupos: GrupoFiltro[], filtro: FiltroExtratoDTO) => {
      const grupo = grupos.find((g) => g.nome === filtro.grupo);
      if (grupo) {
        grupo.filtros.push(filtro);
      } else {
        grupos.push({
          nome: filtro.grupo,
          icone: obterIcone(filtro.grupo),
          filtros: [filtro],
        });
      }
      return grupos;
    }, [] as GrupoFiltro[]);
  }

  function _filtroPorId(id: string) {
    return filtrosAgrupados
      .flatMap((grupo) => grupo.filtros)
      .find((f) => f.id === id);
  }

  function _prioridadePorId(id: string) {
    return (
      filtrosAgrupados
        .flatMap((grupo) => grupo.filtros)
        .find((f) => f.id === id)?.prioridade ?? -1
    );
  }

  return (
    <ExtratoContext.Provider
      value={{
        get extratos() {
          if (!dataRef) return [];
          const datas = fn.dt.mesesEntre(
            dataRef,
            fn.dt.subtrairMeses(dataRef, 11),
          );
          return datas
            .map((data) => extratos.find((e) => fn.dt.mesmoMes(e.data, data)))
            .filter((e) => e) as ExtratoDTO[];
        },
        alternarExibirFiltros,
        alternarFiltro,
        consultarRecorrencia,
        excluirRegistro,
        exibirFiltros,
        extrato,
        extratoFiltrado,
        extratoSubcategoria,
        filtroEstaSelecionado,
        filtrosAgrupados,
        filtrosSelecionados,
        processando,
        salvarRegistro,
      }}
    >
      {props.children}
    </ExtratoContext.Provider>
  );
}

export default ExtratoContext;
