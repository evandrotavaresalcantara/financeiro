interface MenuSecaoProps {
    mini: boolean
    titulo: string
    tituloPq?: string
}

export default function MenuSecao(props: MenuSecaoProps) {
    const { titulo, tituloPq, mini } = props
    return (
        <div className={`
            text-zinc-500 pt-6 pb-2
            font-semibold
            ${mini ? 'px-4 text-[10px]' : 'px-8 text-sm'}
        `}>{mini && tituloPq ? tituloPq : titulo}</div>
    )
}