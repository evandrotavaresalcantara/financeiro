import { fn } from 'utils'

export interface CampoMoedaInlineProps {
    titulo?: string
    valor: number
    valorMudou?: (valor: number) => void
    somenteLeitura?: boolean
    alinhaADireita?: boolean
    className?: string
}

export default function CampoMoedaInline(props: CampoMoedaInlineProps) {
    return (
        <div
            className={`
                flex flex-col relative
                ${props.alinhaADireita ? 'text-right' : ''}
                ${props.className ?? ''}
            `}
        >
            {props.titulo && <span className="text-xs text-zinc-400">{props.titulo}</span>}
            <input
                type="tel"
                value={fn.moeda.num(props.valor).valor}
                size={fn.moeda.num(props.valor).valor.length}
                readOnly={props.somenteLeitura ?? false}
                className={`
                    font-bold bg-transparent font-mono
                    ${!props.somenteLeitura && 'border-b border-dashed border-zinc-600'}
                    outline-none ${props.somenteLeitura ? 'cursor-default' : 'text-yellow-400'}
                    ${props.alinhaADireita ? 'text-right' : ''}
                `}
                onChange={(e) => {
                    props.valorMudou?.(fn.moeda.desformatar(e.currentTarget.value))
                }}
            />
        </div>
    )
}
