import { FiltrarCategorias } from '../../src'
import CategoriaBuilder from '../data/CategoriaBuilder'

test('Deve filtrar categorias', () => {
    const categorias = [
        CategoriaBuilder.criar().comNome('Casa').toProps(),
        CategoriaBuilder.criar().comNome('Pessoais').toProps(),
        CategoriaBuilder.criar().comNome('Saúde').semSubcategorias().toProps(),
    ]
    const filtrar = new FiltrarCategorias(categorias)
    const filtradas = filtrar.filtrar('sa')
    expect(filtradas).toHaveLength(2)
})

test('Deve filtrar subcategorias', () => {
    const categorias = [
        CategoriaBuilder.criar()
            .comNome('Casa')
            .comSubcategorias([
                CategoriaBuilder.criar().comNome('Aluguel').toProps(),
                CategoriaBuilder.criar().comNome('Condomínio').toProps(),
            ])
            .toProps(),
    ]
    const filtrar = new FiltrarCategorias(categorias)
    const filtradas = filtrar.filtrar('cond')
    expect(filtradas).toHaveLength(1)
    expect(filtradas[0]!.subcategorias).toHaveLength(1)
})
