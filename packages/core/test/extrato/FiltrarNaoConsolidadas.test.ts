import FiltrarNaoConsolidada from '../../src/extrato/filter/FiltrarNaoConsolidada'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar não consolidadas', () => {
    const transacoes = [
        TransacaoBuilder.criar().naoConsolidada().comValor(500).agora(),
        TransacaoBuilder.criar().naoConsolidada().comValor(800).agora(),
        TransacaoBuilder.criar().consolidada().comValor(1000).agora(),
    ]

    const filtradas = FiltrarNaoConsolidada.aplicar()(transacoes)
    expect(filtradas).toHaveLength(2)
    expect(filtradas[0]!.valor).toBe(500)
    expect(filtradas[1]!.valor).toBe(800)
})