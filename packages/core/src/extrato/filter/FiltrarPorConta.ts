import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarPorConta',
    aplicar: (contaId: string) => (transacoes) => {
        return transacoes.filter((transacao) => {
            return transacao.contaId === contaId
        })
    },
} as FiltroTransacao
