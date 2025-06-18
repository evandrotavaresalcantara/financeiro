import AgruparTransacoes from "../../src/extrato/model/AgruparTransacoes"
import TransacaoBuilder from "../data/extrato/TransacaoBuilder"

test('Deve agrupar transações', () => {
    const transacoes = [
        TransacaoBuilder.criar().comAgruparPor('Abc').comValor(1000).agora(),
        TransacaoBuilder.criar().semAgruparPor().receita().comValor(1000).agora(),
        TransacaoBuilder.criar().comAgruparPor('Abc').comValor(2000).agora(),
        TransacaoBuilder.criar().comAgruparPor('Def').comValor(3000).agora(),
    ]
    
    const grupos = AgruparTransacoes.com(transacoes)
    expect(grupos).toHaveLength(3)
    expect(grupos[0]!.nome).toBe('Abc')
    expect(grupos[0]!.sumario.total).toBe(-3000)
    expect(grupos[1]!.nome).toBe('Def')
    expect(grupos[1]!.sumario.total).toBe(-3000)
    expect(grupos[2]!.nome).toBe('')
    expect(grupos[2]!.sumario.total).toBe(1000)
})