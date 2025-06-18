interface ConteudoProps {
    children: any
    className?: string
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className={`
            flex flex-col flex-1 w-full min-h-full
            lg:overflow-y-auto ${props.className ?? ''}
        `}>
            {props.children}
        </div>
    )
}