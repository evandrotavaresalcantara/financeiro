import { Loader } from "@mantine/core"
import { TransacaoDTO } from "adapters"
import Moeda from "../tabela/Moeda"
import useProcessamento from "../../../../data/hooks/useProcessamento"

interface CalendarioItemProps {
    transacao: TransacaoDTO
    esconderValor?: boolean
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function CalendarioItem(props: CalendarioItemProps) {
    const {processando, processandoRef, iniciar, finalizar} = useProcessamento()

    function umClick() {
        setTimeout(() => {
            if (!processandoRef.current) {
                props.transacaoSelecionada?.(props.transacao)
            }
        }, 300)
    }

    async function doisClicks() {
        try {
            iniciar()
            await props.transacaoMudou?.({
                ...props.transacao,
                consolidada: !props.transacao.consolidada
            })
        } finally {
            finalizar()
        }
    }

    return (
        <div
            onClick={umClick}
            onDoubleClick={doisClicks}
            className={`
                flex flex-1 items-center px-2 cursor-pointer
                rounded-md max-w-full
                ${!props.transacao.consolidada && !props.transacao.virtual && 'bg-yellow-700'}
                ${props.transacao.virtual && 'bg-purple-700'}
                ${props.transacao.consolidada && 'bg-green-700'}
            `}
        >
            <div className={`
                flex flex-1 items-center 
                ${processando && 'justify-center'}
                text-sm whitespace-nowrap overflow-hidden text-ellipsis
                select-none h-5
            `}>
                {processando ? (
                    <Loader color="white" variant="dots" size="xs" />
                ) : (
                    <div className="flex flex-1 items-center justify-between gap-1">
                        <span>{props.transacao.nome}</span>
                        <Moeda
                            semCor semIcone 
                            esconderValor={props.esconderValor}
                            className="text-[11px] opacity-70"
                        >
                            {props.transacao.valor ?? 0}
                        </Moeda>
                    </div>
                )}
            </div>
        </div>
    )
}