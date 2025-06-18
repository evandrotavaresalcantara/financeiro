import { Button } from '@mantine/core'
import { IconChevronDown, IconFilter } from '@tabler/icons-react'

export interface BotaoFiltrosProps {
    menor?: boolean
    exibirFiltros?: boolean
    exibirFiltrosMudou?: (exibirFiltros: boolean) => void
}

export default function BotaoFiltros(props: BotaoFiltrosProps) {
    return (
        <Button
            color="red"
            px={props.menor ? 4 : 12}
            onClick={() => props.exibirFiltrosMudou?.(!props.exibirFiltros)}
        >
            <IconFilter size={props.menor ? 20 : 24} />
            <span className="ml-2 hidden md:inline">Filtros</span>
        </Button>
    )
}
