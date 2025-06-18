import FiltrarConsolidadas from '../../src/extrato/filter/FiltrarConsolidadas'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar consolidadas', () => {
    const transacoes = [
        TransacaoBuilder.criar().naoConsolidada().comValor(500).agora(),
        TransacaoBuilder.criar().naoConsolidada().comValor(800).agora(),
        TransacaoBuilder.criar().consolidada().comValor(1000).agora(),
    ]

    const filtradas = FiltrarConsolidadas.aplicar()(transacoes)
    expect(filtradas).toHaveLength(1)
    expect(filtradas[0]!.valor).toBe(1000)
})