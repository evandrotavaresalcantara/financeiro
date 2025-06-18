import { fn, IdUnico } from 'utils'
import { TipoOperacao } from '../model/TipoOperacao'
import { Transacao } from '..'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorDespesas',
    aplicar: () => (transacoes) => {
        if (!transacoes?.length) return []

        const receitas = transacoes.filter((t) => t.operacao === TipoOperacao.RECEITA)
        const despesas = transacoes.filter((t) => t.operacao === TipoOperacao.DESPESA)
        if (despesas.length === 0) return transacoes

        const consolidada = despesas.reduce((despesas: Transacao, transacao: Transacao) => {
            return Transacao.nova({
                ...despesas.props,
                id: IdUnico.gerar(),
                nome: 'Despesas',
                data: fn.dt.min(despesas.data, transacao.data)!,
                valor: despesas.valor + transacao.valor,
                operacao: TipoOperacao.DESPESA,
                virtual: true,
                categoriaId: undefined,
                consolidada: false,
                contaId: null,
                cartaoId: null,
                valoresDetalhados: [],
            }).instancia
        })

        return [consolidada, ...receitas]
    },
} as FiltroTransacao
