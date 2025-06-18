import { ExtratoDTO, TransacaoDTO, GrupoTransacaoDTO } from 'adapters'
import NaoEncontrado from '../../../template/shared/NaoEncontrado'
import TabelaGrupo from './TabelaGrupo'

interface TabelaTransacoesProps {
    extrato: ExtratoDTO
    comoCard: boolean
    transacaoSelecionada?: (transacao: TransacaoDTO) => void
    transacaoMudou?: (transacao: TransacaoDTO) => Promise<void>
}

export default function TabelaTransacoes(props: TabelaTransacoesProps) {
    const grupos = props.extrato.grupos ?? []
    const semCabecalho = grupos.every((g) => g.transacoes.length === 1 && g.transacoes[0]!.virtual)

    return !grupos.length ? (
        <NaoEncontrado descricao="Nenhuma transação encontrada!" />
    ) : (
        <div
            className={`
            flex flex-col gap-1
            w-full text-center rounded-md overflow-hidden select-none
        `}
        >
            {grupos.map((grupo: GrupoTransacaoDTO) => {
                return (
                    <TabelaGrupo
                        key={grupo.nome}
                        grupo={grupo}
                        comoCard={props.comoCard}
                        semCabecalho={semCabecalho || (grupos.length === 1 && !grupos[0]!.nome)}
                        transacaoMudou={props.transacaoMudou}
                        transacaoSelecionada={props.transacaoSelecionada}
                    />
                )
            })}
        </div>
    )
}
