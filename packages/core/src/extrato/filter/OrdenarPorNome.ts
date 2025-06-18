import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'OrdenarPorNome',
    aplicar: () => (transacoes) => {
        return [...transacoes].sort((t1, t2) => {
            const v1 = `${t1.agruparPor}${t1.nome.valor}`
            const v2 = `${t2.agruparPor}${t2.nome.valor}`
            const padrao = v1 > v1 ? 1 : v1 < v1 ? -1 : 0
            return v1.localeCompare ? v1.localeCompare(v2, 'pt') : padrao
        })
    },
} as FiltroTransacao
