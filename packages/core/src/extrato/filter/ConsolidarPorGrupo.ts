import { fn, IdUnico } from 'utils'
import { Transacao } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorGrupo',
    aplicar: () => (transacoes) => {
        if (!transacoes?.length) return []

        const grupos = transacoes.reduce((grupos: string[], t: Transacao) => {
            if (grupos.includes(t.agruparPor)) return grupos
            return [...grupos, t.agruparPor]
        }, [])
        if (!grupos.join('')) return transacoes

        return grupos.reduce((consolidadas: Transacao[], grupo: string) => {
            const transacoesDoGrupo = transacoes.filter((t) => t.agruparPor === grupo)

            const todas = [
                ...consolidadas,
                Transacao.nova({
                    id: IdUnico.gerar(),
                    nome: grupo ? grupo : '<sem grupo>',
                    data: fn.dt.min(...transacoesDoGrupo.map((t) => t.data))!,
                    ...Utils.valorEOperacao(transacoesDoGrupo),
                    agruparPor: grupo,
                    virtual: true,
                }).instancia,
            ]
            const semGrupo = todas.find((t) => !t.agruparPor)
            if(!semGrupo) return todas
            return [...todas.filter((t) => t.agruparPor), semGrupo]
        }, [])
    },
} as FiltroTransacao
