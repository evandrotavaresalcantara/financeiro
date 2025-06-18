import ConsolidarPorCartao from '../../src/extrato/filter/ConsolidarPorCartao'
import CartaoBuilder from '../data/CartaoBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

const cartao = CartaoBuilder.criar().comDescricao('NuBank').agora()

test('Deve consolidar por cartão', () => {
    const transacoes = [
        TransacaoBuilder.criar().semCartaoId().comValor(1000).agora(),
        TransacaoBuilder.criar()
            .comCartaoId(cartao.id.valor)
            .comData(new Date('2025/1/7'))
            .comValor(1000)
            .avulsa()
            .agora(),
        TransacaoBuilder.criar()
            .comCartaoId(cartao.id.valor)
            .comData(new Date('2025/1/5'))
            .comValor(1000)
            .avulsa()
            .agora(),
    ]

    const consolidadas = ConsolidarPorCartao.aplicar([cartao])(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.nome.valor).toBe('NuBank')
    expect(consolidadas[0]!.valor).toBe(2000)
})

test('Deve retornar mesmo array quando não tiver vinculo com cartão', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).semCartaoId().agora(),
        TransacaoBuilder.criar().comValor(1000).semCartaoId().agora(),
    ]

    const consolidadas = ConsolidarPorCartao.aplicar([cartao])(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve retornar mesmo array quando cartões não forem passado', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]

    const consolidadas = ConsolidarPorCartao.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})
