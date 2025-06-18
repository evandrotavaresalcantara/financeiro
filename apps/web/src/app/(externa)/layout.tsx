import Conteudo from '@/components/template/base/Conteudo'

export default function Layout(props: any) {
    return (
        <div
            className={`
                flex flex-col items-center h-screen w-screen
                bg-gradient-to-r from-zinc-900 via-zinc-900 to-black text-white 
            `}
        >
            <Conteudo>{props.children}</Conteudo>
        </div>
    )
}
