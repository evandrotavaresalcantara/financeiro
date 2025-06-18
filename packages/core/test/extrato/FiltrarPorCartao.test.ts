import CartaoBuilder from '../data/CartaoBuilder'
import FiltrarPorCartao from '../../src/extrato/filter/FiltrarPorCartao'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve filtrar por cartão', () => {
    const cartao = CartaoBuilder.criar().comDescricao('NuBank').agora()
    
    const transacoes = [
        TransacaoBuilder.criar().comCartaoId(cartao.id.valor).comValor(500).agora(),
        TransacaoBuilder.criar().comCartaoId(cartao.id.valor).comValor(800).agora(),
        TransacaoBuilder.criar().semCartaoId().comValor(1000).agora(),
    ]

    const filtradas = FiltrarPorCartao.aplicar(cartao.id.valor)(transacoes)
    expect(filtradas).toHaveLength(2)
    expect(filtradas[0]!.valor).toBe(500)
    expect(filtradas[1]!.valor).toBe(800)
})