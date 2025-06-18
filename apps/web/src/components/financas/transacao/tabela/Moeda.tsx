import { fn } from "utils"
import { IconEye, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { useEffect, useState } from "react"

export interface MoedaProps {
    children: number
    semCor?: boolean
    semIcone?: boolean
    tamanhoIcone?: number
    esconderValor?: boolean
    className?: string
}

export default function Moeda(props: MoedaProps) {
    const [esconderValor, setEsconderValor] = useState<boolean>(props.esconderValor ?? false)
    
    const { semCor, semIcone } = props
    const valor = props.children
    
    useEffect(() => {
        setEsconderValor(props.esconderValor ?? false)
    }, [props.esconderValor])

    function alternar(e: any) {
        e.stopPropagation()
        e.preventDefault()
        setEsconderValor(!esconderValor)
    }

    return (
        <div className={`
            flex justify-center items-center
            ${!semCor && valor > 0 ? 'text-green-400' : !semCor && valor < 0 ? 'text-red-400' : ''}
            ${props.className ?? ''}
        `}>
            {!semIcone && (
                <span className="hidden md:inline">
                    {valor > 0 ? (
                        <IconTrendingUp size={props.tamanhoIcone ?? 24} className="mr-2" />
                    ) : valor < 0 ? (
                        <IconTrendingDown size={props.tamanhoIcone ?? 24} className="mr-2" />
                    ) : null}
                </span>
            )}
            <div onClick={alternar} className="cursor-pointer">
                {esconderValor ? (
                    <IconEye  />
                ) : (
                    <span>
                        {fn.moeda.num(Math.abs(valor)).valor}
                    </span>
                )}
            </div>
        </div>
    )
}