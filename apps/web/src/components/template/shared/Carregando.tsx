import { Loader } from "@mantine/core"

interface CarregandoProps {
    telaCheia?: boolean
    className?: string
    tamanho?: string
    simples?: boolean
}

export default function Carregando(props: CarregandoProps) {
    return (
        <div className={`
            flex flex-1 justify-center items-center 
            ${props.telaCheia ? 'h-screen w-screen bg-zinc-800' : ''}
            ${props.className ?? ''}
        `}>
            <div className={props.tamanho ?? 'w-9'}>
                <Loader variant={props.simples ? "oval" : "bars"} />
            </div>
        </div>
    )
}