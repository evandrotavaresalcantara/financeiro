import ConsolidarPorConta from '../../src/extrato/filter/ConsolidarPorConta'
import ContaBuilder from '../data/ContaBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve consolidar por conta', () => {
    const conta = ContaBuilder.criar().comDescricao('NuBank').agora()
    const transacoes = [
        TransacaoBuilder.criar().semContaId().comData(new Date('2025/1/6')).comValor(1000).obter()
            .instancia,
        TransacaoBuilder.criar()
            .comContaId(conta.id.valor)
            .comData(new Date('2025/1/5'))
            .comValor(1000)
            .agora(),
        TransacaoBuilder.criar()
            .comContaId(conta.id.valor)
            .comData(new Date('2025/1/4'))
            .comValor(1000)
            .agora(),
    ]

    const consolidadas = ConsolidarPorConta.aplicar([conta])(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.nome.valor).toBe('NuBank')
    expect(consolidadas[0]!.valor).toBe(2000)
})

test('Deve retornar mesmo array quando não tiver vinculo com cartão', () => {
    const conta = ContaBuilder.criar().comDescricao('NuBank').agora()
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).semContaId().agora(),
        TransacaoBuilder.criar().comValor(1000).semContaId().agora(),
    ]

    const consolidadas = ConsolidarPorConta.aplicar([conta])(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve retornar mesmo array quando cartões não forem passado', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]

    const consolidadas = ConsolidarPorConta.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve retornar array vazio para transações nulas', () => {
    const conta = ContaBuilder.criar().comDescricao('NuBank').agora()
    const consolidadas = ConsolidarPorConta.aplicar([conta])(null as any)
    expect(consolidadas).toHaveLength(0)
})
