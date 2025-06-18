export interface BarraProps {
    texto: string
    valorA: number
    valorB: number
    valorACor?: string
    valorBCor?: string
    vertical?: boolean
    className?: string
}

export default function Barra(props: BarraProps) {
    const total = Math.abs(props.valorA) + Math.abs(props.valorB)
    const percA = Math.round((props.valorA / total) * 100) ?? 0
    const percB = 100 - percA

    function renderizarCorpoDaBarra(conteudo?: any) {
        const v = props.vertical
        return (
            <div className={`flex items-center ${v ? 'flex-col' : 'flex-row'}`}>
                <div
                    className={`
                        flex ${v ? 'flex-col-reverse' : 'flex-row'}
                        rounded-lg overflow-hidden
                        ${v ? 'h-44 w-14' : 'h-7 w-full'}
                    `}
                >
                    {conteudo}
                </div>
                <span
                    className={`
                        flex justify-center
                        ${props.vertical ? 'mt-2' : 'ml-2'} 
                        md:text-sm w-[70px]
                        ${percA > percB ? 'text-green-400' : percA < percB ? 'text-red-400' : 'text-zinc-300'}
                    `}
                >
                    {props.texto}
                </span>
            </div>
        )
    }

    function renderizarVazio() {
        const v = props.vertical
        return renderizarCorpoDaBarra(
            <div
                className={`
                ${v ? 'bg-gradient-to-b' : 'bg-gradient-to-r'}
                from-zinc-800 to-zinc-900 h-full w-full
            `}
            ></div>
        )
    }

    function renderizarPercentual(percentual: number, cor: string) {
        const v = props.vertical
        const perc = Math.round(percentual)
        const style = { [v ? 'height' : 'width']: `${perc}%` }

        return (
            <div
                className={`
                    flex items-center justify-center text-xs
                    ${v ? 'bg-gradient-to-b' : 'bg-gradient-to-r'}
                    ${cor} h-full w-full
                `}
                style={style}
            >
                {perc}%
            </div>
        )
    }

    if (props.valorA === 0 && props.valorB === 0) {
        return renderizarVazio()
    } else {
        return renderizarCorpoDaBarra(
            <>
                {percA > 0 && renderizarPercentual(percA, 'from-green-600 to-green-800')}
                {percA > 0 && percB > 0 && <div className={props.vertical ? 'h-0.5' : 'w-1'} />}
                {percB > 0 && renderizarPercentual(percB, 'from-red-600 to-red-800')}
            </>
        )
    }
}
