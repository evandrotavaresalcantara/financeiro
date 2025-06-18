import ConsolidarPorReceitas from '../../src/extrato/filter/ConsolidarPorReceitas'
import FiltrarAvulsas from '../../src/extrato/filter/FiltrarAvulsas'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar avulsas', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(500).agora(),
        TransacaoBuilder.criar().comValor(800).agora(),
        TransacaoBuilder.criar().avulsa().comValor(1000).agora(),
    ]

    const filtradas = FiltrarAvulsas.aplicar()(transacoes)
    expect(filtradas).toHaveLength(1)
    expect(filtradas[0]!.valor).toBe(1000)
})