"use client";
import { CategoriaDTO } from "adapters";
import { createContext, useEffect, useRef, useState } from "react";
import categoriasPadroes from "../constants/categorias";
import useCentralDeAcesso from "../hooks/useCentralDeAcesso";
import useCoreFacade from "../hooks/useCoreFacade";

export interface CategoriasContextProps {
  categoriasAgrupadas: CategoriaDTO[];
  categorias: CategoriaDTO[];
  salvarCategoria: (categoria: CategoriaDTO) => Promise<void>;
  excluirCategoria: (categoria: CategoriaDTO) => Promise<void>;
  preencherCategoriasPadroes: () => Promise<void>;
  filtrarCategorias: (filtro: string) => CategoriaDTO[];
  nomeCategoria: (categoriaId?: string | null) => string;
}

const CategoriasContext = createContext<CategoriasContextProps>({} as any);

export function CategoriasProvider(props: any) {
  const { usuario } = useCentralDeAcesso();
  const categoriasRef = useRef<CategoriaDTO[]>([]);
  const [categoriasAgrupadas, setCategoriasAgrupadas] = useState<
    CategoriaDTO[]
  >([]);
  const core2 = useCoreFacade();

  useEffect(() => {
    consultarCategorias();
  }, [usuario]);

  async function consultarCategorias() {
    if (!usuario) return;
    const categorias = await core2.categoria.consultar(usuario);
    setCategoriasAgrupadas(categorias);
    categoriasRef.current = _categoriasFlat(categorias);
  }

  async function salvarCategoria(categoria: CategoriaDTO) {
    if (!usuario || !categoriasAgrupadas) return;
    await core2.categoria.salvar(usuario, categoria);
    await consultarCategorias();
  }

  async function preencherCategoriasPadroes() {
    if (!usuario) return;
    await core2.categoria.salvarTodas(usuario, categoriasPadroes);
    await consultarCategorias();
  }

  async function excluirCategoria(categoria: CategoriaDTO) {
    if (!usuario || !categoriasAgrupadas) return;
    await core2.categoria.excluir(usuario, categoria);
    await consultarCategorias();
  }

  function filtrarCategorias(pesquisa: string) {
    return core2.categoria.filtrar(pesquisa, categoriasAgrupadas);
  }

  function nomeCategoria(categoriaId?: string | null) {
    if (!categoriaId) return "";
    const categoria = categoriasRef.current.find(
      (cat) => cat.id === categoriaId,
    );
    return categoria?.pai
      ? `${categoria.pai.nome}/${categoria.nome}`
      : categoria?.nome ?? "";
  }

  function _categoriasFlat(categoriasAgrupadas: CategoriaDTO[]) {
    return categoriasAgrupadas.reduce(
      (todas: CategoriaDTO[], cat: CategoriaDTO) => {
        return [...todas, cat, ...(cat.subcategorias ?? [])];
      },
      [],
    );
  }

  return (
    <CategoriasContext.Provider
      value={{
        categoriasAgrupadas,
        get categorias() {
          return categoriasRef.current;
        },
        salvarCategoria,
        excluirCategoria,
        preencherCategoriasPadroes,
        filtrarCategorias,
        nomeCategoria,
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
}

export default CategoriasContext;
