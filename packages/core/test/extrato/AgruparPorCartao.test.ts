import AgruparPorCartao from '../../src/extrato/filter/AgruparPorCartao'
import CartaoBuilder from '../data/CartaoBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve agrupar por cartão', () => {
    const cartao = CartaoBuilder.criar().comDescricao('NuBank').agora()

    const transacoes = [
        TransacaoBuilder.criar().agora(),
        TransacaoBuilder.criar().comCartaoId(cartao.id.valor).agora(),
        TransacaoBuilder.criar().comCartaoId(cartao.id.valor).agora(),
        TransacaoBuilder.criar().comCartaoId(cartao.id.valor).agora(),
    ]
    const agrupadas = AgruparPorCartao.aplicar([cartao])(transacoes)
    expect(agrupadas).toHaveLength(4)
    expect(agrupadas[1]!.agruparPor).toBe('NuBank')
    expect(agrupadas[2]!.agruparPor).toBe('NuBank')
    expect(agrupadas[3]!.agruparPor).toBe('NuBank')
})
