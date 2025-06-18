import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarRecorrencias',
    aplicar: () => (transacoes) => {
        return transacoes.filter((transacao) => {
            return transacao.recorrenciaId !== null
        })
    },
} as FiltroTransacao
