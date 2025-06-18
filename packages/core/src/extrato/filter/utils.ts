import { TipoOperacao } from '../model/TipoOperacao'
import { Transacao } from '..'

export class Utils {
    static valorEOperacao(transacoes: Transacao[]) {
        const valores = transacoes.map((t) => {
            return t.operacao === TipoOperacao.RECEITA ? Math.abs(t.valor) : -Math.abs(t.valor)
        })
        const valor = valores.reduce((a, b) => a + b, 0)

        return {
            valor: Math.abs(valor),
            operacao: valor > 0 ? TipoOperacao.RECEITA : TipoOperacao.DESPESA,
        }
    }
}
