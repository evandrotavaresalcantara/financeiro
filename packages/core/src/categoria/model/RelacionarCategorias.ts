import Categoria from './Categoria'
import Resultado from '../../shared/base/Resultado'

export default class RelacionarCategorias {
    constructor(private categorias: Categoria[]) {}

    executar(): Resultado<Categoria[]> {
        const categorias = this.categorias
            .map((categoria) => {
                if (!categoria) return Resultado.falha('CATEGORIA_NULA')
                const subcategorias = this.categorias
                    .filter((c) => c.idPai?.valor === categoria.id.valor)
                    .map(
                        (s) =>
                            Categoria.nova({
                                ...s.props,
                                pai: categoria.props,
                            }).instancia
                    )

                if (categoria.idPai) return Resultado.nulo()

                return Categoria.nova({
                    ...categoria.props,
                    subcategorias: subcategorias.map((s) => s.props),
                })
            })
            .filter((c) => c.deuErrado || c.instancia)
        return Resultado.combinar(categorias) as Resultado<Categoria[]>
    }
}
