import AgruparPorCategoria from "../../src/extrato/filter/AgruparPorCategoria"
import ConsolidarPorGrupo from "../../src/extrato/filter/ConsolidarPorGrupo"
import CategoriaBuilder from "../data/CategoriaBuilder"
import TransacaoBuilder from "../data/extrato/TransacaoBuilder"

test('Deve consolidar por grupo', () => {
    const categoria = CategoriaBuilder.criar().comNome('Pessoal').agora()
    const transacoes = [
        TransacaoBuilder.criar().semCategoriaId().comValor(1000).agora(),
        TransacaoBuilder.criar().comCategoriaId(categoria.id.valor).comValor(1000).agora(),
        TransacaoBuilder.criar().comCategoriaId(categoria.id.valor).comValor(1000).agora(),
    ]

    const agrupadas = AgruparPorCategoria.aplicar([categoria])(transacoes)

    const consolidadas = ConsolidarPorGrupo.aplicar()(agrupadas)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.nome.valor).toBe('Pessoal')
    expect(consolidadas[0]!.valor).toBe(2000)
    expect(consolidadas[1]!.nome.valor).toBe('<sem grupo>')
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve consolidar por grupo que não existe', () => {
    const categoria = CategoriaBuilder.criar().comNome('Pessoal').agora()
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]

    const agrupadas = AgruparPorCategoria.aplicar([categoria])(transacoes)
    const consolidadas = ConsolidarPorGrupo.aplicar()(agrupadas)
    expect(consolidadas).toHaveLength(3)
})

test('Deve ignorar quando não tive como consolidar por grupo', () => {
    const categoria = CategoriaBuilder.criar().comNome('Pessoal').agora()
    const transacoes = [
        TransacaoBuilder.criar().semCategoriaId().comValor(1000).agora(),
        TransacaoBuilder.criar().semCategoriaId().comValor(1000).avulsa().agora(),
        TransacaoBuilder.criar().semCategoriaId().comValor(1000).avulsa().agora(),
    ]

    const agrupadas = AgruparPorCategoria.aplicar([categoria])(transacoes)
    expect(agrupadas).toHaveLength(3)

    const consolidadas = ConsolidarPorGrupo.aplicar()(agrupadas)
    expect(consolidadas).toHaveLength(3)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
    expect(consolidadas[2]!.valor).toBe(1000)
})

test('Deve retornar array vazio para transações nulas', () => {
    const consolidadas = ConsolidarPorGrupo.aplicar()(null as any)
    expect(consolidadas).toHaveLength(0)
})