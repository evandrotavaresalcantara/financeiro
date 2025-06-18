import { IconBuildingBank, IconCreditCard, IconRepeat } from "@tabler/icons-react"
import { Tooltip } from "@mantine/core"
import { TransacaoDTO } from "adapters"
import IconeArea from "../../../template/shared/IconeArea"
import useContas from "../../../../data/hooks/useContas"
import useCartoes from "../../../../data/hooks/useCartoes"

export interface MarcacoesTransacaoProps {
    transacao: TransacaoDTO
}

export default function MarcacoesTransacao(props: MarcacoesTransacaoProps) {
    const { transacao } = props
    const { cartaoPorId } = useCartoes()
    const { contaPorId } = useContas()

    return (
        <>
            {transacao.contaId && (
                <Tooltip label={contaPorId(transacao.contaId)?.descricao ?? 'Conta'}>
                    <div>
                        <IconeArea
                            tamanho={6} tamanhoIcone={15}
                            cor={contaPorId(transacao.contaId)?.cor ?? '#7e22ce'}
                        >
                            <IconBuildingBank size={15} />
                        </IconeArea>
                    </div>
                </Tooltip>
            )}
            {transacao.cartaoId && (
                <Tooltip label={cartaoPorId(transacao.cartaoId)?.descricao ?? 'Cartão'}>
                    <div>
                        <IconeArea
                            tamanho={6} tamanhoIcone={15}
                            cor={cartaoPorId(transacao.cartaoId)?.cor ?? '#7e22ce'}
                        >
                            <IconCreditCard size={15} />
                        </IconeArea>
                    </div>
                </Tooltip>
            )}
            {transacao.emMemoria && <IconRepeat />}
        </>
    )
}