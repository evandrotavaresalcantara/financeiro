import { Button } from "@mantine/core"
import { IconTrendingUp } from "@tabler/icons-react"
import { useState } from "react"
import Estatistica from "../template/estatistica/Estatistica"
import MiniFormulario from "../template/formulario/MiniFormulario"
import SimOuNao from "../template/shared/SimOuNao"

interface FormularioEsconderSumariosProps {
    valor: boolean
    xs: boolean
    valorMudou?: (valor: boolean) => void
}

export default function FormularioEsconderSumarios(props: FormularioEsconderSumariosProps) {
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
            titulo="Esconder os Totalizadores?"
            subtitulo="Defina se o valores totalizados são escondidos por padrão"
            botoes={renderizarBotao()}
            textoCentralizado={props.xs}
        >
            <div className={`
                flex items-center gap-7 flex-wrap
                ${props.xs ? 'justify-center' : 'justify-between'}
            `}>
                <div className="flex flex-col items-start gap-4">
                    <SimOuNao valor={valor} valorMudou={setValor} />
                </div>
                <div className="w-96 border-zinc-700 border rounded-lg">
                    <Estatistica
                        titulo="Valor"
                        texto={2000}
                        comoDinheiro
                        icone={<IconTrendingUp size={50} className="text-green-500" />}
                        className=""
                        esconder={valor}
                    />
                </div>
            </div>
        </MiniFormulario>
    )
}