import { TipoOperacao } from '../model/TipoOperacao'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarReceitas',
    aplicar: () => (transacoes) => {
        return transacoes.filter((transacao) => {
            return transacao.operacao === TipoOperacao.RECEITA
        })
    },
} as FiltroTransacao
