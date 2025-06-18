export interface TxtGradienteProps {
    cores?: string[]
    children: any
}

export default function TxtGradiente(props: TxtGradienteProps) {
    return (
        <span className={`
            text-transparent bg-clip-text 
            bg-gradient-to-r
            ${props.cores?.[0] ?? 'from-blue-500'} ${props.cores?.[1] ?? 'to-green-500'}
        `}>{props.children}</span>
    )
}