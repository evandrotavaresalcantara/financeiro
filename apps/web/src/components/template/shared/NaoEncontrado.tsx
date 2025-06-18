import { IconCircleX } from "@tabler/icons-react"

export interface NaoEncontradoProps {
    descricao: any
    icone?: any
}

export default function NaoEncontrado(props: NaoEncontradoProps) {
    return (
        <div className={`
            font-extralight text-zinc-600
            flex flex-col justify-center items-center text-lg
            py-10
        `}>
            
            <span>{props.icone ?? <IconCircleX size={90} />}</span>
            <span>{props.descricao}</span>
        </div>
    )
}