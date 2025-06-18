import { Cartao } from '../../cartao'
import { IdUnico } from 'utils'
import { Transacao } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorCartao',
    aplicar: (cartoes: Cartao[]) => (transacoes) => {
        if (!cartoes?.length) return transacoes
        const consolidadas = cartoes
            .map((c) => {
                const trsDoCartao = transacoes?.filter((t) => t.cartaoId === c.id.valor)
                if (!trsDoCartao?.length) return null

                const menorData = trsDoCartao.reduce((menor: Date, t) => {
                    return t.data < menor ? t.data : menor
                }, trsDoCartao[0]!.data)

                return Transacao.nova({
                    id: IdUnico.gerar(),
                    nome: c.descricao.valor,
                    data: menorData,
                    ...Utils.valorEOperacao(trsDoCartao),
                    cartaoId: c.id.valor,
                    virtual: true,
                }).instancia
            })
            .filter((t) => t)

        return (consolidadas as Transacao[]).concat(transacoes?.filter((t) => !t.cartaoId))
    },
} as FiltroTransacao
