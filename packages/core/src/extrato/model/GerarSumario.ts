import { TipoOperacao } from './TipoOperacao'
import Sumario, { SumarioProps } from './Sumario'
import Transacao, { TransacaoProps } from './Transacao'

export default class GerarSumario {
    static com(data: Date, transacoes: (Transacao | TransacaoProps)[]): Sumario {
        if (transacoes.length === 0) {
            return Sumario.novo({ data, receitas: 0, despesas: 0 }).instancia
        }

        const somar = (total: number, t: Transacao | TransacaoProps) => total + t.valor
        const receitas = transacoes
            .filter((t) => t.operacao === TipoOperacao.RECEITA)
            .reduce(somar, 0)
        const despesas = transacoes
            .filter((t) => t.operacao === TipoOperacao.DESPESA)
            .reduce(somar, 0)
        const props: SumarioProps = { data, total: receitas - despesas, receitas, despesas }
        return Sumario.novo(props).instancia
    }
}
