import { Button, SegmentedControl } from "@mantine/core"
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react"
import { useState } from "react"
import Menu from "../template/menu/Menu"
import MiniFormulario from "../template/formulario/MiniFormulario"

interface FormularioMenuMiniProps {
    valor: boolean
    xs: boolean
    valorMudou?: (valor: boolean) => void
}

export default function FormularioMenuMini(props: FormularioMenuMiniProps) {
    const [valor, setValor] = useState<boolean>(props.valor)

    function renderizarBotao() {
        return (
            <Button
                className="bg-blue-500"
                onClick={() => props.valorMudou?.(valor)}
                disabled={props.valor === valor}
            >Salvar</Button>
        )
    }

    return (
        <MiniFormulario
            titulo="Menu Pequeno por Padrão?"
            subtitulo="Defina se o menu pequeno é a opção padrão"
            botoes={renderizarBotao()}
            textoCentralizado={props.xs}
        >
            <div className={`
                flex items-center gap-7 flex-wrap
                ${props.xs ? 'justify-center' : 'justify-between'}
            `}>
                <div className="flex flex-col items-start gap-4">
                    <SegmentedControl
                        size="lg"
                        value={valor ? 's' : 'n'}
                        onChange={valor => setValor(valor === 's')}
                        data={[
                            {
                                value: 's',
                                label: (
                                    <div className="flex items-center gap-3">
                                        <span><IconLayoutSidebarLeftCollapse /></span>
                                        <span>Sim</span>
                                    </div>
                                ),
                            },
                            {
                                value: 'n',
                                label: (
                                    <div className="flex items-center gap-3">
                                        <span><IconLayoutSidebarLeftExpand /></span>
                                        <span>Não</span>
                                    </div>
                                ),
                            },
                        ]}
                    />

                </div>
                <div className="w-[300px] h-[120px] overflow-hidden border-zinc-700 border rounded-lg">
                    <Menu className="-mt-[75px]"></Menu>
                </div>
            </div>
        </MiniFormulario>
    )
}