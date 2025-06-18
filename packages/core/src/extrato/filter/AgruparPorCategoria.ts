import { Categoria } from '../../categoria'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorCategoria',
    aplicar: (categorias: Categoria[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (categoria: Categoria) => categoria.id.valor === transacao.categoriaId
            const categoria = categorias.find(porId)
            const agruparPor = categoria?.pai?.nome.valor ?? categoria?.nome.valor ?? transacao.categoriaId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
