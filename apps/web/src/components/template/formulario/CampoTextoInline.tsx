import { useEffect, useState } from "react"

export interface CampoTextoInlineProps {
    titulo?: string
    valor: string
    valorMudou?: (valor: string) => void
    min?: number
    max?: number
    alinhaADireita?: boolean
    className?: string
}

export default function CampoTextoInline(props: CampoTextoInlineProps) {
    const [valor, setValor] = useState(props.valor)

    useEffect(() => {
        setValor(props.valor)
    }, [props.valor])

    useEffect(() => {
        valido() && props.valorMudou?.(valor)
    }, [valor])

    function valido() {
        if (props.min && valor.length < props.min) return false
        if (props.max && valor.length > props.max) return false
        return true
    }

    return (
        <div className={`
            flex flex-col relative
            ${props.alinhaADireita ? 'text-right' : ''}
            ${props.className ?? ''}
        `}>
            {props.titulo && (
                <span className="text-xs text-zinc-400">{props.titulo}</span>
            )}
            <input
                type="text"
                value={valor}
                size={valor.length}
                className={`
                    font-bold bg-transparent font-mono
                    border-b border-dashed 
                    ${valido() ? 'border-zinc-600' : 'border-red-400'}
                    outline-none
                    ${props.alinhaADireita ? 'text-right' : ''}
                `}
                onChange={e => {
                    const valor = e.currentTarget.value
                    if (props.max && valor.length > props.max) return
                    setValor(valor)
                }}
            />
            {!valido() && (
                <span className="text-[9px] font-normal -mt-2 text-red-400">Tamanho inválido</span>
            )}
        </div>
    )
}