import { TipoOperacao } from '../model/TipoOperacao'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'FiltrarDespesas',
    aplicar: () => (transacoes) => {
        return transacoes.filter((transacao) => {
            return transacao.operacao === TipoOperacao.DESPESA
        })
    },
} as FiltroTransacao
