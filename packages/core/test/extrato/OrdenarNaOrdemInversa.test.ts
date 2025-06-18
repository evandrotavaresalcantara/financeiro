import OrdenarNaOrdemInversa from "../../src/extrato/filter/OrdenarNaOrdemInversa"
import TransacaoBuilder from "../data/extrato/TransacaoBuilder"

test('Deve ordenar na ordem inversa', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(500).agora(),
        TransacaoBuilder.criar().comValor(800).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]
    const novasTransacoes = OrdenarNaOrdemInversa.aplicar()(transacoes)
    expect(novasTransacoes).toHaveLength(3)
    expect(novasTransacoes[0]!.valor).toBe(1000)
    expect(novasTransacoes[1]!.valor).toBe(800)
    expect(novasTransacoes[2]!.valor).toBe(500)
})