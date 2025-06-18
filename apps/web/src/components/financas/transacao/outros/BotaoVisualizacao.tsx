import { Button, Menu } from '@mantine/core'
import { IconLayout } from '@tabler/icons-react'
import { TipoVisualizacao } from 'core'
import visualizacoes from '../../../../data/constants/visualizacoes'

export interface BotaoVisualizacaoProps {
    menor?: boolean
    visualizacao: TipoVisualizacao
    visualizacaoMudou: (tipo: TipoVisualizacao) => void
}

export default function BotaoVisualizacao(props: BotaoVisualizacaoProps) {
    function selecionar(tipo: TipoVisualizacao) {
        return () => props.visualizacaoMudou?.(tipo)
    }

    return (
        <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
                <Button color="green" px={props.menor ? 4 : 12}>
                    <IconLayout size={props.menor ? 20 : 24} />
                    <span className="ml-2 hidden lg:inline">Layout</span>
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Visualizar Como</Menu.Label>
                {visualizacoes.map((v) => (
                    <Menu.Item
                        key={v.tipo}
                        leftSection={v.icone}
                        onClick={selecionar(v.tipo)}
                        className={`
                            ${props.visualizacao === v.tipo && 'text-blue-500'}
                        `}
                    >
                        {v.texto}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    )
}
