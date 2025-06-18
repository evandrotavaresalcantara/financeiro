import { fn, IdUnico } from 'utils'
import { Transacao } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorAvulsas',
    aplicar: () => (transacoes) => {
        const naoAvulsas = transacoes.filter((t) => t.recorrenciaId != null)
        const avulsas = transacoes.filter((t) => t.recorrenciaId == null)
        if (avulsas.length === 0) return transacoes

        const consolidada = avulsas.reduce((avulsa: Transacao, transacao: Transacao) => {
            return Transacao.nova({
                ...avulsa.props,
                id: IdUnico.gerar(),
                nome: 'Avulsas',
                data: fn.dt.min(avulsa.data, transacao.data)!,
                ...Utils.valorEOperacao(avulsas),
                virtual: true,
                categoriaId: undefined,
                consolidada: false,
            }).instancia
        })

        return [consolidada, ...naoAvulsas]
    },
} as FiltroTransacao
