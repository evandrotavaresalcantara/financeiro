import { Transacao } from '..'
import { Categoria } from '../../categoria'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorSubcategoria',
    aplicar: (categorias: Categoria[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (categoria: Categoria) => categoria.id.valor === transacao.categoriaId
            const categoria = categorias.find(porId)
            const nomeCompleto = categoria?.pai
                ? categoria?.pai?.nome.valor + '/' + categoria?.nome.valor
                : categoria?.nome.valor
            const agruparPor = nomeCompleto ?? transacao.categoriaId ?? undefined
            return Transacao.nova({ ...transacao.props, agruparPor }).instancia
        }),
} as FiltroTransacao
