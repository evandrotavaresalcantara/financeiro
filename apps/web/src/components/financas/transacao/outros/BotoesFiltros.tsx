import { Button } from "@mantine/core"
import { IconArrowsUpDown, IconFilter, IconFolders, IconGridDots, IconGridPattern } from "@tabler/icons-react"

export interface BotoesFiltrosProps {
    menor?: boolean
    exibirFiltros?: boolean
    exibirFiltrosMudou?: (exibirFiltros: boolean) => void
}

export default function BotoesFiltros(props: BotoesFiltrosProps) {
    return (
        <>
            <Button
                color="red"
                px={props.menor ? 4 : 12}
                className={`bg-gradient-to-r from-red-500 to-red-600`}
            >
                <IconFolders size={props.menor ? 20 : 24} />
                <span className="ml-2 hidden lg:inline">Agrupar</span>
            </Button>
            <Button
                color="purple"
                className={`bg-gradient-to-r from-purple-500 to-purple-600`}
                px={props.menor ? 4 : 12}
                onClick={() => props.exibirFiltrosMudou?.(!props.exibirFiltros)}
            >
                <IconFilter size={props.menor ? 20 : 24} />
                <span className="ml-2 hidden lg:inline">Filtrar</span>
            </Button>
            <Button
                color="cyan"
                className={`bg-gradient-to-r from-cyan-500 to-cyan-600`}
                px={props.menor ? 4 : 12}
                onClick={() => props.exibirFiltrosMudou?.(!props.exibirFiltros)}
            >
                <IconArrowsUpDown size={props.menor ? 20 : 24} />
                <span className="ml-2 hidden lg:inline">Ordenar</span>
            </Button>
        </>
    )
}