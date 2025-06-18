import React from "react"
import TxtGradiente from "../shared/TxtGradiente"

interface TituloProps {
    titulo: string[]
    subtitulo?: string
    inline?: boolean
    className?: string
}

export default function Titulo(props: TituloProps) {
    return (
        <>
            <div className={`
                ${props.inline ? 'inline-block' : 'flex flex-col'} 
                font-black text-lg sm:text-2xl ${props.className ?? ''}
            `}>
                <div>
                    {props.titulo?.map((texto, i) => {
                        const ultimo = props.titulo.length - 1 === i
                        return (
                            <React.Fragment key={`titulo-parte-${i}`}>
                                {texto.startsWith(' ') && <span className="w-2.5" />}
                                {ultimo ? <TxtGradiente>{texto}</TxtGradiente> : <span>{texto}</span>}
                                {texto.endsWith(' ') && <span className="w-2.5" />}
                            </React.Fragment>
                        )
                    }) ?? ""}
                </div>
                {props.subtitulo && (
                    <div className="text-xs sm:text-sm font-normal text-zinc-400">
                        {props.subtitulo}
                    </div>
                )}
            </div>
        </>
    )
}