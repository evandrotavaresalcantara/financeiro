import FiltrarRecorrencias from '../../src/extrato/filter/FiltrarRecorrencias'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar por recorrencias', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(500).agora(),
        TransacaoBuilder.criar().avulsa().comValor(800).agora(),
        TransacaoBuilder.criar().avulsa().comValor(1000).agora(),
    ]

    const filtradas = FiltrarRecorrencias.aplicar()(transacoes)
    expect(filtradas).toHaveLength(1)
    expect(filtradas[0]!.valor).toBe(500)
})