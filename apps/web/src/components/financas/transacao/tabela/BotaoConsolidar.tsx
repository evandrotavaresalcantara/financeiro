import { IconCheck, IconCircleDashed, IconStack2 } from "@tabler/icons-react"
import { TransacaoDTO } from "adapters"
import ComLoader from "../../../template/shared/ComLoader"

export interface BotaoConsolidarProps {
    transacao: TransacaoDTO
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function BotaoConsolidar(props: BotaoConsolidarProps) {
    const { transacao, transacaoMudou } = props

    return (
        <>
            {transacao.virtual ? (
                <IconStack2 />
            ) : (
                <ComLoader tamanho={20}>
                    <div
                        className='flex justify-center cursor-pointer'
                        onClick={async e => {
                            e.preventDefault()
                            e.stopPropagation()
                            await transacaoMudou?.({
                                ...transacao,
                                consolidada: !transacao.consolidada
                            })
                        }}
                    >{transacao.consolidada ? <IconCheck className="text-green-600" /> : <IconCircleDashed />}</div>
                </ComLoader>
            )}
        </>
    )
}