import { Transacao } from '..'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'RemoverDuplicadas',
    aplicar: () => (transacoes) => {
        return transacoes.reduce((transacoes: Transacao[], transacao: Transacao) => {
            const duplicada = transacoes.find((avulsa: Transacao) => {
                return avulsa.recorrenciaId === transacao.recorrenciaId
            })
            return duplicada
                ? transacoes.map((t) => (t === duplicada && !transacao.emMemoria ? transacao : t))
                : transacoes.concat(transacao)
        }, [])
    },
} as FiltroTransacao
