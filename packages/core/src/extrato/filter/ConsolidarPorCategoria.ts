import { Categoria } from '../../categoria'
import { fn, IdUnico } from 'utils'
import { Transacao } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorCategoria',
    aplicar: (categorias: Categoria[]) => (transacoes) => {
        if (!transacoes?.length) return []
        if (!categorias?.length) return transacoes

        const primarias = categorias.filter((c) => !c.idPai)
        const consolidadas = primarias
            .map((categoria) => {
                const selecionadas = _transacoesDaCategoria(categoria, transacoes)
                if (selecionadas.length === 0) return null

                return Transacao.nova({
                    id: IdUnico.gerar(),
                    nome: categoria.nome.valor,
                    data: fn.dt.min(...selecionadas.map((t) => t.data))!,
                    ...Utils.valorEOperacao(selecionadas),
                    virtual: true,
                    categoriaId: categoria.id.valor,
                    consolidada: false,
                }).instancia
            })
            .filter((c) => c)

        return consolidadas.concat(transacoes.filter((t) => t.categoriaId == null))
    },
} as FiltroTransacao

function _transacoesDaCategoria(categoria: Categoria, transacoes: Transacao[]): Transacao[] {
    return transacoes.filter((t) => {
        const procurado = t.categoriaId
        const primaria = procurado === categoria.id.valor
        const secundaria = categoria.subcategorias?.find((s) => s.id.valor === procurado)
        return primaria || secundaria != null
    })
}
