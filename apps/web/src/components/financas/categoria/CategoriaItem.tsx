import { Badge } from "@mantine/core";
import { CategoriaDTO } from "adapters";
import { IconTags } from "@tabler/icons-react";
import TagItem from "./TagItem";

interface CategoriaItemProps {
  categoria: CategoriaDTO;
  categoriaSelecionada: (categoria: CategoriaDTO) => void;
  categoriaPaiSelecionada: (categoria: CategoriaDTO) => void;
}

export default function CategoriaItem(props: CategoriaItemProps) {
  const qtde = props.categoria.subcategorias?.length ?? 0;

  function renderizarSubcategorias() {
    return props.categoria.subcategorias?.map((cat) => {
      return (
        <TagItem
          key={cat.id}
          categoria={cat}
          categoriaPai={props.categoria}
          categoriaSelecionada={props.categoriaSelecionada}
          categoriaPaiSelecionada={props.categoriaPaiSelecionada}
        />
      );
    });
  }

  return (
    <div
      className={`
            flex flex-col justify-between
            rounded-md cursor-pointer overflow-hidden
        `}
    >
      <div
        className={`
                flex-1 flex items-center justify-between py-2.5 px-4
                bg-black border-b border-zinc-800
            `}
      >
        <div
          className="flex items-center gap-3"
          onClick={() => props.categoriaSelecionada(props.categoria)}
        >
          <IconTags size={33} />
          <span className="font-black text-xl">{props.categoria.nome}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge color="gray" variant="filled">
            {qtde} {qtde === 1 ? "tag" : "tags"}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap p-8 gap-5 bg-zinc-900">
        {renderizarSubcategorias()}
        <TagItem
          categoriaPai={props.categoria}
          categoriaPaiSelecionada={props.categoriaPaiSelecionada}
        />
      </div>
    </div>
  );
}
