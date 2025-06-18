interface TabelaColunaProps {
    alinharNoCentro?: boolean
    alinharADireita?: boolean
    esconder?: boolean
    onClick?: (e: any) => void
    children: any
}
export default function TabelaColuna(props: TabelaColunaProps) {
    return props.esconder ? null : (
        <div onClick={props.onClick} className={`
            flex items-center gap-3 
            ${props.onClick && 'cursor-pointer'}
            ${props.alinharNoCentro && 'justify-center'}
            ${props.alinharADireita && 'justify-end'}
        `}>
            {props.children}
        </div>
    )
}