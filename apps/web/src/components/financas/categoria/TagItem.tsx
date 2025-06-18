import { Badge } from "@mantine/core";
import { CategoriaDTO } from "adapters";
import { IconTags, IconTag, IconPlus } from "@tabler/icons-react";

interface TagItemProps {
  categoria?: CategoriaDTO;
  categoriaPai?: CategoriaDTO;
  destaque?: boolean;
  maior?: boolean;
  categoriaSelecionada?: (categoria: CategoriaDTO) => void;
  categoriaPaiSelecionada?: (categoriaPai: CategoriaDTO) => void;
  className?: string;
}

export default function TagItem(props: TagItemProps) {
  function icone() {
    if (!props.categoria) return <IconPlus size={props.maior ? 22 : 15} />;
    return props.categoria?.idPai ? (
      <IconTag size={props.maior ? 22 : 15} />
    ) : (
      <IconTags size={props.maior ? 22 : 15} />
    );
  }

  return (
    <Badge
      size={props.maior ? "xl" : "lg"}
      variant="gradient"
      gradient={
        props.destaque
          ? { from: "teal", to: "lime", deg: 105 }
          : props.categoria
            ? { from: "indigo", to: "cyan" }
            : { from: "orange", to: "red" }
      }
      leftSection={icone()}
      onClick={() => {
        props.categoria
          ? props.categoriaSelecionada?.(props.categoria)
          : props.categoriaPai &&
            props.categoriaPaiSelecionada?.(props.categoriaPai);
      }}
      className={`
                ${props.className ?? ""}
                ${props.maior ? "px-6" : ""}
                capitalize
            `}
    >
      {props.categoria?.nome ?? "Nova Subcategoria"}
    </Badge>
  );
}
