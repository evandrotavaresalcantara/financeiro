import ConsolidarPorAvulsas from '../../src/extrato/filter/ConsolidarPorAvulsas'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve consolidar avulsas', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(3000).avulsa().receita().agora(),
        TransacaoBuilder.criar().comValor(1000).avulsa().agora(),
    ]

    const consolidadas = ConsolidarPorAvulsas.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.nome.valor).toBe('Avulsas')
    expect(consolidadas[0]!.valor).toBe(2000)
})

test('Deve retornar mesmo array quando não tiver avulsas', () => {
    const transacoes = [
        TransacaoBuilder.criar().comValor(1000).agora(),
        TransacaoBuilder.criar().comValor(1000).agora(),
    ]

    const consolidadas = ConsolidarPorAvulsas.aplicar()(transacoes)
    expect(consolidadas).toHaveLength(2)
    expect(consolidadas[0]!.valor).toBe(1000)
    expect(consolidadas[1]!.valor).toBe(1000)
})
