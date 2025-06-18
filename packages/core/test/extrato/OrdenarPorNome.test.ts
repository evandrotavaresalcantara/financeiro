import AgruparPorCategoria from "../../src/extrato/filter/AgruparPorCategoria"
import CategoriaBuilder from "../data/CategoriaBuilder"
import OrdenarPorNome from "../../src/extrato/filter/OrdenarPorNome"
import TransacaoBuilder from "../data/extrato/TransacaoBuilder"

test('Deve ordenar por nome', () => {
    const transacoes = [
        TransacaoBuilder.criar().comNome('Água').comValor(500).agora(),
        TransacaoBuilder.criar().comNome('Energia').comValor(800).agora(),
        TransacaoBuilder.criar().comNome('Água').comValor(600).agora(),
        TransacaoBuilder.criar().comNome('Condomínio').comValor(1000).agora(),
    ]
    const novasTransacoes = OrdenarPorNome.aplicar()(transacoes)
    expect(novasTransacoes).toHaveLength(4)
    expect(novasTransacoes[0]!.valor).toBe(500)
    expect(novasTransacoes[1]!.valor).toBe(600)
    expect(novasTransacoes[2]!.valor).toBe(1000)
    expect(novasTransacoes[3]!.valor).toBe(800)
})

test('Deve ordenar por nome com agrupamento', () => {
    const catCasa = CategoriaBuilder.criar().comNome('Casa').agora()
    const catPessoal = CategoriaBuilder.criar().comNome('Pessoal').agora()

    const transacoes = [
        TransacaoBuilder.criar().comNome('Energia').comCategoriaId(catCasa.id.valor).comValor(800).agora(),
        TransacaoBuilder.criar().comNome('Água').comCategoriaId(catCasa.id.valor).comValor(500).agora(),
        TransacaoBuilder.criar().comNome('Academia').comCategoriaId(catPessoal.id.valor).comValor(1000).agora(),
    ]

    const agrupadas = AgruparPorCategoria.aplicar([catCasa, catPessoal])(transacoes)
    const novasTransacoes = OrdenarPorNome.aplicar()(agrupadas)
    expect(novasTransacoes).toHaveLength(3)
    expect(novasTransacoes[0]!.valor).toBe(500)
    expect(novasTransacoes[1]!.valor).toBe(800)
    expect(novasTransacoes[2]!.valor).toBe(1000)
})