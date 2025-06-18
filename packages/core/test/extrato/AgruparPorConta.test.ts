import AgruparPorCartao from '../../src/extrato/filter/AgruparPorCartao'
import AgruparPorConta from '../../src/extrato/filter/AgruparPorConta'
import ContaBuilder from '../data/ContaBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve agrupar por conta', () => {
    const conta = ContaBuilder.criar().comDescricao('NuBank').agora()

    const transacoes = [
        TransacaoBuilder.criar().agora(),
        TransacaoBuilder.criar().comContaId(conta.id.valor).agora(),
        TransacaoBuilder.criar().comContaId(conta.id.valor).agora(),
        TransacaoBuilder.criar().comContaId(conta.id.valor).agora(),
    ]
    const agrupadas = AgruparPorConta.aplicar([conta])(transacoes)
    expect(agrupadas).toHaveLength(4)
    expect(agrupadas[1]!.agruparPor).toBe('NuBank')
    expect(agrupadas[2]!.agruparPor).toBe('NuBank')
    expect(agrupadas[3]!.agruparPor).toBe('NuBank')
})
