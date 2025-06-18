import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'OrdenarPorValor',
    aplicar: () => (transacoes) => {
        return [...transacoes].sort((t1, t2) => {
            return t1.valor - t2.valor
        })
    },
} as FiltroTransacao
