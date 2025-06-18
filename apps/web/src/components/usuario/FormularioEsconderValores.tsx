import { Button } from "@mantine/core"
import { useState } from "react"
import MiniFormulario from "../template/formulario/MiniFormulario"
import SimOuNao from "../template/shared/SimOuNao"

interface FormularioEsconderValoresProps {
    valor: boolean
    xs: boolean
    valorMudou?: (valor: boolean) => void
}

export default function FormularioEsconderValores(props: FormularioEsconderValoresProps) {
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
            titulo="Esconder os Valores?"
            subtitulo="Defina se o valores individuais são escondidos por padrão"
            botoes={renderizarBotao()}
            textoCentralizado={props.xs}
        >
            <div className={`
                flex items-center gap-7 flex-wrap
                ${props.xs ? 'justify-center' : 'justify-between'}
            `}>
                <SimOuNao valor={valor} valorMudou={setValor} />
            </div>
        </MiniFormulario>
    )
}