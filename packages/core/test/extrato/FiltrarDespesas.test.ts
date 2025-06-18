import FiltrarDespesas from '../../src/extrato/filter/FiltrarDespesas'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar despesas', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(500).agora(),
        TransacaoBuilder.criar().comValor(800).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]

    const filtradas = FiltrarDespesas.aplicar()(transacoes)
    expect(filtradas).toHaveLength(3)
    expect(filtradas[0]!.valor).toBe(500)
    expect(filtradas[1]!.valor).toBe(800)
    expect(filtradas[2]!.valor).toBe(1000)
})