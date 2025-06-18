import ConsolidarPorCategoria from '../../src/extrato/filter/ConsolidarPorCategoria'
import CategoriaBuilder from '../data/CategoriaBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'


test('Deve consolidar por categoria', () => {
    const categoria = CategoriaBuilder.criar().comNome('Pessoal').agora()
    const transacoes = [
        TransacaoBuilder.criar().semCategoriaId().comValor(1000).agora(),
        TransacaoBuilder.criar().comCategoriaId(categoria.id.valor).comValor(1000).obter()
            .instancia,
        TransacaoBuilder.criar().comCategoriaId(categoria.id.valor).comValor(1000).obter()
            .instancia,
    ]

    const consolidadas = ConsolidarPorCategoria.aplicar([categoria])(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.nome.valor).toBe('Pessoal')
    expect(consolidadas[0]!.valor).toBe(2000)
})

test('Deve retornar mesmo array quando não tiver vinculo com cartão', () => {
    const categoria = CategoriaBuilder.criar()
        .comNome('Pessoal')
        .comSubcategorias([CategoriaBuilder.criar().comNome('Alimentação').toProps()])
        .agora()
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).semCategoriaId().agora(),
        TransacaoBuilder.criar().comValor(1000).semCategoriaId().agora(),
    ]

    const consolidadas = ConsolidarPorCategoria.aplicar([categoria])(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve retornar mesmo array quando cartões não forem passado', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]

    const consolidadas = ConsolidarPorCategoria.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve retornar array vazio para transações nulas', () => {
    const categoria = CategoriaBuilder.criar().comNome('Pessoal').agora()
    const consolidadas = ConsolidarPorCategoria.aplicar([categoria])(null as any)
    expect(consolidadas).toHaveLength(0)
})
