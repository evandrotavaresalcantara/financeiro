import FiltrarReceitas from '../../src/extrato/filter/FiltrarReceitas'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar por receita', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(500).agora(),
        TransacaoBuilder.criar().receita().comValor(800).agora(),
        TransacaoBuilder.criar().receita().comValor(1000).agora(),
    ]

    const filtradas = FiltrarReceitas.aplicar()(transacoes)
    expect(filtradas).toHaveLength(2)
    expect(filtradas[0]!.valor).toBe(800)
    expect(filtradas[1]!.valor).toBe(1000)
})