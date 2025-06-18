import Categoria from '../../src/categoria/model/Categoria'
import CategoriaBuilder from '../data/CategoriaBuilder'

test('Deve criar categoria', () => {
    const props = CategoriaBuilder.criar().comNome('abc').comId('def').toProps()
    const criarCategoria = Categoria.nova(props)

    const categoria = criarCategoria.instancia
    expect(categoria.nome.valor).toBe('abc')
    expect(categoria.id.valor).toBe('def')
})

test('Deve criar categorias', () => {
    const cats = [
        CategoriaBuilder.criar().comNome('Pessoal').toProps(),
        CategoriaBuilder.criar().comNome('Casa').toProps(),
    ]
    const criarCategorias = Categoria.novas(cats)
    const categorias = criarCategorias.instancia
    expect(categorias).toHaveLength(2)
})

test('Deve criar categoria com subcategorias', () => {
    const subcategorias = [
        CategoriaBuilder.criar().comNome('abc - 1').toProps(),
        CategoriaBuilder.criar().comNome('abc - 2').toProps(),
        CategoriaBuilder.criar().comNome('abc - 3').toProps(),
    ]
    const props = CategoriaBuilder.criar().comNome('abc').comSubcategorias(subcategorias).toProps()
    const criarCategoria = Categoria.nova(props)

    const categoria = criarCategoria.instancia
    expect(categoria.nome.valor).toBe('abc')
    expect(categoria.subcategorias).toHaveLength(3)
})

test('Deve criar categoria sem subcategorias', () => {
    const props = CategoriaBuilder.criar().semSubcategorias().toProps()
    const categoria = Categoria.nova(props).instancia
    expect(categoria.subcategorias).toHaveLength(0)
})

test('Deve gerar erro sem nome', () => {
    const props = CategoriaBuilder.criar().semNome().toProps()
    const criarCategoria = Categoria.nova(props)
    expect(criarCategoria.deuErrado).toBe(true)
})

test('Deve criar categoria com filho', () => {
    const categoriaPai = CategoriaBuilder.criar().comNome('ABC').obter()

    const categoriaFilho = CategoriaBuilder.criar()
        .comNome('DEF')
        .comIdPai(categoriaPai.instancia.props.id!)
        .comPai(categoriaPai.instancia.props)
        .comSubcategorias([categoriaPai.instancia.props])
        .obter()

    const idPai = categoriaFilho.instancia.idPai?.valor
    expect(idPai).toBe(categoriaPai.instancia.props.id)
})
