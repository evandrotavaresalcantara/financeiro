import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarPorCartao',
    aplicar: (cartaoId: string) => (transacoes) => {
        return transacoes.filter((transacao) => {
            return transacao.cartaoId === cartaoId
        })
    },
} as FiltroTransacao
