export interface CardProps {
    children: any
    className?: string
    semPadding?: boolean
    onClick?: (e: any) => void
}

export default function Card(props: CardProps) {
    return (
        <div className={`
            bg-black rounded-xl
            ${props.semPadding ? '' : 'p-5'}
            ${props.onClick && 'cursor-pointer'}
            ${props.className ?? ''}
        `} onClick={e => props.onClick?.(e)}>
            {props.children}
        </div>
    )
}