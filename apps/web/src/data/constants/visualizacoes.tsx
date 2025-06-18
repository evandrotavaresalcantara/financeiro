import { IconCalendar, IconLayoutGrid, IconLayoutList } from '@tabler/icons-react'
import { TipoVisualizacao } from 'core'

const visualizacoes = [
    {
        texto: 'Lista',
        tipo: TipoVisualizacao.LISTA,
        icone: <IconLayoutList />,
    },
    {
        texto: 'Cartão',
        tipo: TipoVisualizacao.CARD,
        icone: <IconLayoutGrid />,
    },
    {
        texto: 'Calendario',
        tipo: TipoVisualizacao.CALENDARIO,
        icone: <IconCalendar />,
    },
]

export default visualizacoes
