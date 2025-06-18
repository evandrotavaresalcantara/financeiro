import Card from "../template/shared/Card"

export interface AreaDadosProps {
    titulo: any
    subtitulo?: string
    children: any
    className?: string
}

export default function AreaDados(props: AreaDadosProps) {
    return (
        <Card className={`
            flex flex-col gap-7 items-center
            ${props.className ?? ''}
        `}>
            <div className="flex flex-col items-center text-center">
                <div className="font-black text-xl">
                    {props.titulo}
                </div>
                {props.subtitulo && (
                    <div className="text-xs text-zinc-400">
                        {props.subtitulo}
                    </div>
                )}
            </div>
            {props.children}
        </Card>
    )
}