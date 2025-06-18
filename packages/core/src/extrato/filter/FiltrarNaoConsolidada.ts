import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarNaoConsolidada',
    aplicar: () => (transacoes) => {
        return transacoes.filter((transacao) => {
            return !transacao.consolidada && !transacao.virtual
        })
    },
} as FiltroTransacao
