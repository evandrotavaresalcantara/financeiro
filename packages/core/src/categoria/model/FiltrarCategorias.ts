import Categoria from './Categoria'

export default class FiltrarCategorias {
    constructor(private categorias: Categoria[]) {}

    filtrar(pesquisa: string): Categoria[] {
        return this.categorias.reduce((filtradas: Categoria[], cat: Categoria) => {
            const encontrou = cat.nome.valor.toLowerCase().includes(pesquisa.toLowerCase())
            const filhos =
                cat.subcategorias?.filter((sub) => {
                    return sub.nome.valor.toLowerCase().includes(pesquisa.toLowerCase())
                }) ?? []
            const novaCat = Categoria.nova({
                ...cat.props,
                subcategorias: filhos.map((f) => f.props),
            }).instancia
            return encontrou || filhos.length ? [...filtradas, novaCat] : filtradas
        }, [])
    }
}
