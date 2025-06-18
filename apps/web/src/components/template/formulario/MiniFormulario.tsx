export interface MiniFormularioProps {
    titulo: any
    subtitulo?: any
    botoes?: any
    children: any
    textoCentralizado?: boolean
}

export default function MiniFormulario(props: MiniFormularioProps) {
    return (
        <div className={`
            flex flex-col rounded-lg overflow-hidden
            bg-black
        `}>
            <div className="flex flex-col p-7 gap-1">
                <div className={`
                    text-2xl font-black
                    ${props.textoCentralizado && 'text-center'}
                `}>
                    {props.titulo}
                </div>
                {props.subtitulo && (
                    <div className={`
                        text-sm text-zinc-400 
                        ${props.textoCentralizado && 'text-center'}
                    `}>
                        {props.subtitulo}
                    </div>
                )}
                <div className="pt-4 pb-2">
                    {props.children}
                </div>
            </div>
            {props.botoes && (
                <div className={`
                    flex items-center justify-end 
                    border-t border-zinc-800
                    bg-zinc-900 px-7 py-4
                `}>
                    {props.botoes}
                </div>
            )}
        </div>
    )
}