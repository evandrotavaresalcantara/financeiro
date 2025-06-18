import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarConsolidadas',
    aplicar: () => (transacoes) => {
        return transacoes.filter((transacao) => {
            return transacao.consolidada
        })
    },
} as FiltroTransacao
