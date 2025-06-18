import { Conta } from '../../conta'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorConta',
    aplicar: (contas: Conta[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (conta: Conta) => conta.id.valor === transacao.contaId
            const conta = contas.find(porId)
            const agruparPor = conta?.descricao.valor ?? transacao.contaId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
