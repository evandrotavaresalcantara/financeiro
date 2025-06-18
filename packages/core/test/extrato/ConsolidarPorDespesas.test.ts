import ConsolidarPorDespesas from '../../src/extrato/filter/ConsolidarPorDespesas'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve consolidar despesas', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).avulsa().agora(),
        TransacaoBuilder.criar().comValor(1000).avulsa().agora(),
    ]

    const consolidadas = ConsolidarPorDespesas.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(1)
    expect(consolidadas[0]!.nome.valor).toBe('Despesas')
    expect(consolidadas[0]!.valor).toBe(3000)
})

test('Deve retornar mesmo array quando não tiver despesas', () => {
    const transacoes = [
        TransacaoBuilder.criar().receita().comValor(1000).agora(),
        TransacaoBuilder.criar().receita().comValor(1000).agora(),
    ]

    const consolidadas = ConsolidarPorDespesas.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})

test('Deve retornar array vazio para transações nulas', () => {
    const consolidadas = ConsolidarPorDespesas.aplicar()(null as any)
    expect(consolidadas).toHaveLength(0)
})
