import ContaBuilder from '../data/ContaBuilder'
import FiltrarPorConta from '../../src/extrato/filter/FiltrarPorConta'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar por conta', () => {
    const conta = ContaBuilder.criar().comDescricao('NuBank').agora()
    
    const transacoes = [
        TransacaoBuilder.criar().comContaId(conta.id.valor).comValor(500).agora(),
        TransacaoBuilder.criar().comContaId(conta.id.valor).comValor(800).agora(),
        TransacaoBuilder.criar().semContaId().comValor(1000).agora(),
    ]

    const filtradas = FiltrarPorConta.aplicar(conta.id.valor)(transacoes)
    expect(filtradas).toHaveLength(2)
    expect(filtradas[0]!.valor).toBe(500)
    expect(filtradas[1]!.valor).toBe(800)
})