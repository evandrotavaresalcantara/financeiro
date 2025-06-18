import GerarSumario from './GerarSumario'
import GrupoTransacao from './GrupoTransacao'
import Transacao from './Transacao'

export default class AgruparTransacoes {
    static com(transacoes: Transacao[]): GrupoTransacao[] {
        if (transacoes.length === 0) return []

        const grupos = transacoes.reduce((grupos: string[], transacao) => {
            const agruparPor = transacao.agruparPor
            if (grupos.includes(agruparPor)) return grupos
            return [...grupos, agruparPor]
        }, [])

        const gruposTransacoes = grupos.map((grupo) => {
            const transacoesDoGrupo = transacoes
                .filter((t) => t.agruparPor === grupo)
                .map((t) => t.props)
            const sumario = GerarSumario.com(transacoes[0]!.data, transacoesDoGrupo).props
            return { nome: grupo, sumario, transacoes: transacoesDoGrupo }
        })

        return gruposTransacoes.sort((a, b) => {
            if (!a.nome) return 1
            if (!b.nome) return -1
            return a.nome.localeCompare(b.nome)
        })
    }
}
