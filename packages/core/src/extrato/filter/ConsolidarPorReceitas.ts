import { fn, IdUnico } from 'utils'
import { TipoOperacao } from '../model/TipoOperacao'
import { Transacao } from '..'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorReceitas',
    aplicar: () => (transacoes) => {
        if (!transacoes?.length) return []

        const receitas = transacoes.filter((t) => t.operacao === TipoOperacao.RECEITA)
        const despesas = transacoes.filter((t) => t.operacao === TipoOperacao.DESPESA)
        if (receitas.length === 0) return transacoes

        const consolidada = receitas.reduce((receitas: Transacao, transacao: Transacao) => {
            return Transacao.nova({
                ...receitas.props,
                id: IdUnico.gerar(),
                nome: 'Receitas',
                data: fn.dt.min(receitas.data, transacao.data)!,
                valor: receitas.valor + transacao.valor,
                operacao: TipoOperacao.RECEITA,
                virtual: true,
                categoriaId: undefined,
                consolidada: false,
                contaId: null,
                cartaoId: null,
                valoresDetalhados: [],
            }).instancia
        })

        return [consolidada, ...despesas]
    },
} as FiltroTransacao
