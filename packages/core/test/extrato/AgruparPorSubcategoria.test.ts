import { Categoria } from '../../src'
import AgruparPorSubcategoria from '../../src/extrato/filter/AgruparPorSubcategoria'
import CategoriaBuilder from '../data/CategoriaBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve agrupar por categoria', () => {
    const subs = [
        CategoriaBuilder.criar().comNome('Esporte').toProps(),
        CategoriaBuilder.criar().comNome('Roupas').toProps(),
    ]
    const pai = CategoriaBuilder.criar().comNome('Pessoal').comSubcategorias(subs).agora()

    subs[0] = { ...subs[0], pai: pai.props }
    subs[1] = { ...subs[1], pai: pai.props }

    const transacoes = [
        TransacaoBuilder.criar().comCategoriaId(subs[0]!.id!).agora(),
        TransacaoBuilder.criar().comCategoriaId(pai.id.valor).agora(),
        TransacaoBuilder.criar().semCategoriaId().agora(),
    ]
    const agrupadas = AgruparPorSubcategoria.aplicar([
        pai,
        Categoria.nova(subs[0]!).instancia,
        Categoria.nova(subs[1]!).instancia,
    ])(transacoes)

    expect(agrupadas[0]!.agruparPor).toBe('Pessoal/Esporte')
    expect(agrupadas[1]!.agruparPor).toBe('Pessoal')
    expect(agrupadas[2]!.agruparPor).toBe('')
})
