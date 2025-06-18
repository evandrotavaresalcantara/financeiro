import { fn } from "utils"
import { GrupoTransacaoDTO, TransacaoDTO } from "adapters"
import CalendarioItem from "./CalendarioItem"
import useCentralDeAcesso from "../../../../data/hooks/useCentralDeAcesso"

interface CalendarioDiaProps {
    grupo: GrupoTransacaoDTO
    data: Date
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function CalendarioDia(props: CalendarioDiaProps) {
    const { grupo, data } = props
    const { usuarioConfig } = useCentralDeAcesso()

    const agora = new Date()
    const hoje = fn.dt.mesmoDia(agora, data)

    const total = grupo.sumario.receitas - grupo.sumario.despesas

    return (
        <div key={data.getMilliseconds()} className={`
            relative flex flex-col
            bg-black min-h-[100px] rounded-md w-full
        `}>
            <div className={`
                flex justify-between items-center
                text-zinc-500 px-3 py-1
            `}>
                <span className="text-xs text-zinc-600">R$ {fn.moeda.num(total).valor}</span>
                <span className={`
                    flex justify-center items-center rounded-full 
                    ${hoje && 'bg-red-500 text-white w-6 h-6 text-sm'}
                `}>
                    {data.getDate()}
                </span>
            </div>
            <div className="flex flex-col gap-1 px-3 pt-1.5 pb-3">
                {grupo.transacoes.map(tr => {
                    return (
                        <CalendarioItem
                            key={tr.id}
                            esconderValor={usuarioConfig?.esconderValores}
                            transacao={tr}
                            transacaoSelecionada={props.transacaoSelecionada}
                            transacaoMudou={props.transacaoMudou}
                        />
                    )
                })}
            </div>
        </div>
    )
}