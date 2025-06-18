import { fn } from 'utils'
import { IconEyeOff } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface EstatisticaProps {
    titulo: string
    texto: any
    icone: any
    esconder: boolean
    iconeClass?: string
    textoClass?: string
    className?: string
    comoDinheiro?: boolean
}

export default function Estatistica(props: EstatisticaProps) {
    const [esconder, setEsconder] = useState(props.esconder ?? true)
    useEffect(() => setEsconder(props.esconder ?? true), [props.esconder])

    function renderizarValorFinanceiro(valor: number) {
        return (
            <div className="flex items-baseline gap-3">
                <span className="text-xl">{fn.moeda.simbolo()}</span>
                <span>
                    {valor < 0 ? '-' : ''}
                    {fn.moeda.num(Math.abs(valor)).somenteValor()}
                </span>
            </div>
        )
    }

    return (
        <div
            className={`
            flex flex-col rounded-xl py-3 md:py-5 pl-8 pr-5
            bg-black
        `}
        >
            <div className="font-bold text-zinc-600">{props.titulo}</div>
            <div className="flex items-center justify-between">
                <div
                    className={`
                        text-2xl lg:text-3xl 2xl:text-4xl font-black 
                        cursor-pointer ${props.textoClass ?? ''}
                    `}
                    onClick={() => setEsconder(!esconder)}
                >
                    {esconder ? (
                        <div
                            className={`
                            flex items-center gap-2 text-base font-bold
                            text-zinc-800 
                        `}
                        >
                            <IconEyeOff size={40} strokeWidth={3} />
                            <span>Mostrar Valor</span>
                        </div>
                    ) : props.comoDinheiro ? (
                        renderizarValorFinanceiro(props.texto)
                    ) : (
                        props.texto
                    )}
                </div>
                <div className={props.iconeClass}>{props.icone}</div>
            </div>
        </div>
    )
}
