import { CategoriaDTO } from 'adapters'
import { IconTags } from '@tabler/icons-react'
import { Select } from '@mantine/core'
import useCategorias from '../../../data/hooks/useCategorias'

interface CampoCategoriaProps {
    rotulo?: string
    valor?: string | null
    valorMudou?: (valor: string) => void
    className?: string
}

export default function CampoCategoria(props: CampoCategoriaProps) {
    const { categoriasAgrupadas, categorias } = useCategorias()

    const nome = categorias.find((cat) => cat.id === props.valor)?.nome ?? ''

    function alterarCategoria(nome: string | null) {
        const id = categorias.find((cat) => cat.nome === nome)?.id ?? null
        id && props.valorMudou?.(id)
    }

    return (
        <Select
            label={props.rotulo}
            placeholder="Selecione uma categoria"
            size="md"
            leftSection={<IconTags />}
            searchable
            value={nome}
            onChange={alterarCategoria}
            data={
                categoriasAgrupadas.reduce<any>((dados, cat: CategoriaDTO) => {
                    const cats: CategoriaDTO[] = cat.subcategorias ?? []
                    return [
                        ...dados,
                        {
                            group: cat.nome,
                            items: cats.map((subcat) => subcat.nome) ?? [],
                        },
                    ]
                }, []) ?? []
            }
            className={props.className ?? ''}
        />
    )
}
