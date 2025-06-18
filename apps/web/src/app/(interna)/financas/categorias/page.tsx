"use client";
import { Button, Modal } from "@mantine/core";
import { CategoriaDTO } from "adapters";
import { IconTags, IconFilter, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import CampoTexto from "@/components/template/formulario/CampoTexto";
import CategoriaItem from "@/components/financas/categoria/CategoriaItem";
import ComLoader from "@/components/template/shared/ComLoader";
import FormularioCategoria from "@/components/financas/categoria/FormularioCategoria";
import NaoEncontrado from "@/components/template/shared/NaoEncontrado";
import Pagina from "@/components/template/base/Pagina";
import useCategorias from "@/data/hooks/useCategorias";

export default function Categorias() {
  const {
    categoriasAgrupadas,
    filtrarCategorias,
    salvarCategoria,
    excluirCategoria,
    preencherCategoriasPadroes,
  } = useCategorias();
  const [pesquisa, setPesquisa] = useState<string>("");
  const [filtradas, setFiltradas] = useState<CategoriaDTO[]>([]);
  const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);

  useEffect(
    () => setFiltradas(categoriasAgrupadas ?? []),
    [categoriasAgrupadas],
  );
  useEffect(() => setFiltradas(filtrarCategorias(pesquisa)), [pesquisa]);

  async function salvar(categoria: CategoriaDTO) {
    await salvarCategoria(categoria);
    setCategoria(null);
  }

  async function excluir(categoria: CategoriaDTO) {
    await excluirCategoria(categoria);
    setCategoria(null);
  }

  return (
    <Pagina titulo="Minhas Categorias">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-7">
          <CampoTexto
            icone={<IconFilter />}
            placeholder="Digite para pesquisar"
            className="w-full"
            valor={pesquisa}
            valorMudou={setPesquisa}
          />
          <Button
            className="bg-gradient-to-r from-indigo-600 to-cyan-600"
            size="md"
            onClick={() => setCategoria({ nome: "" })}
          >
            <span>
              <IconPlus />
            </span>
            <span className="ml-2">Nova Categoria</span>
          </Button>
        </div>
        {filtradas.length ? (
          filtradas.map((categoria) => {
            return (
              <CategoriaItem
                key={categoria.id}
                categoria={categoria}
                categoriaSelecionada={(cat) => setCategoria(cat ?? {})}
                categoriaPaiSelecionada={(catPai) =>
                  setCategoria({ nome: "", idPai: catPai.id })
                }
              />
            );
          })
        ) : !categoriasAgrupadas.length ? (
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-black">
              Quer usar as categorias padrões?
            </span>
            <span className="text-sm text-zinc-500">
              Você pode definir suas próprias categorias ou usar nossas
              categorias
            </span>
            <ComLoader>
              <Button
                className="bg-blue-500 my-6"
                onClick={preencherCategoriasPadroes}
              >
                <IconTags />
                <span className="ml-2">Usar Categorias Padrões</span>
              </Button>
            </ComLoader>
          </div>
        ) : (
          <NaoEncontrado descricao="Nenhuma categoria encontrada!" />
        )}
      </div>

      <Modal
        opened={!!categoria}
        onClose={() => setCategoria(null)}
        centered
        withCloseButton={false}
        padding={0}
      >
        <FormularioCategoria
          categoria={categoria}
          salvar={salvar}
          excluir={excluir}
          cancelar={async () => setCategoria(null)}
        />
      </Modal>
    </Pagina>
  );
}
