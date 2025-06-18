import { Tooltip } from "@mantine/core"
import Link from "next/link"
import { usePathname } from "next/navigation"
import TxtGradiente from "../shared/TxtGradiente"

interface MenuItemProps {
    mini: boolean
    href: string
    texto: string
    icone: any
    onClick?: (e: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    const { mini, href, texto, icone } = props

    const path = usePathname()
    const ativo = path === href
    const textoFinal = mini ? null : ativo ? <TxtGradiente>{texto}</TxtGradiente> : texto

    function envolver(children: any) {
        return mini ? (
            <Tooltip label={texto} color="blue" withArrow position="right">
                {children}
            </Tooltip>
        ) : children
    }

    return envolver(
        <Link key={href} href={href} passHref onClick={props.onClick} className={`
            flex items-center gap-2 mx-4 my-1 px-4 py-3 rounded-lg
            hover:bg-black
            ${ativo ? 'bg-black text-blue-500' : 'text-zinc-300'}
        `}>{icone}{textoFinal}</Link>
    )
}