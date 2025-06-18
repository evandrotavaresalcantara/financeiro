'use client'
import Conteudo from '@/components/template/base/Conteudo'
import ForcarAutenticacao from '@/components/usuario/ForcarAutenticacao'
import MenuResponsivo from '@/components/template/menu/MenuResponsivo'

export default function Layout(props: any) {
    return (
        <ForcarAutenticacao>
            <div
                className={`
                    flex h-screen w-screen
                    bg-zinc-800 text-white
                `}
            >
                <MenuResponsivo />
                <Conteudo className={props.className ?? ''}>{props.children}</Conteudo>
            </div>
        </ForcarAutenticacao>
    )
}
