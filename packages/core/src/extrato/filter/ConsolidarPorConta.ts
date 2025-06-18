import { Conta } from '../../conta'
import { IdUnico } from 'utils'
import { Transacao } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorConta',
    aplicar: (contas: Conta[]) => (transacoes) => {
        if (!transacoes?.length) return []
        if (!contas?.length) return transacoes
        const consolidadas = contas
            .map((c) => {
                const trsDaConta = transacoes.filter((t) => t.contaId === c.id.valor)
                if (!trsDaConta.length) return null

                const menorData = trsDaConta.reduce((menor: Date, t) => {
                    return t.data < menor ? t.data : menor
                }, trsDaConta[0]!.data)

                return Transacao.nova({
                    id: IdUnico.gerar(),
                    nome: c.descricao.valor,
                    data: menorData,
                    ...Utils.valorEOperacao(trsDaConta),
                    contaId: c.id.valor,
                    virtual: true,
                }).instancia
            })
            .filter((c) => c)

        return consolidadas.concat(transacoes.filter((t) => !t.contaId))
    },
} as FiltroTransacao
