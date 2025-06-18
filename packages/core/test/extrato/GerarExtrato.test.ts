import GerarExtrato from "../../src/extrato/model/GerarExtrato"
import RecorrenciaBuilder from "../data/RecorrenciaBuilder"
import TransacaoBuilder from "../data/extrato/TransacaoBuilder"

const transacoes = [
    TransacaoBuilder.criar().comValor(100).comData(new Date('2025/1/8')).toProps(),
    TransacaoBuilder.criar().comValor(250).comData(new Date('2025/3/8')).toProps(),
]

test('Deve gerar extrato com uma transação', () => {
    const recorrencias = transacoes.map(tr => {
        return RecorrenciaBuilder.criar().comTransacao(tr).agora()
    })

    const gerarExtrato = GerarExtrato.com(new Date('2025/1/3'), recorrencias)
    expect(gerarExtrato.deuCerto).toBe(true)
    
    const extrato = gerarExtrato.instancia
    expect(extrato.transacoes).toHaveLength(1)
    expect(extrato.sumario.despesas).toBe(100)
})

test('Deve gerar extrato com duas transações', () => {
    const recorrencias = transacoes.map(tr => {
        return RecorrenciaBuilder.criar().comTransacao(tr).agora()
    })

    const gerarExtrato = GerarExtrato.com(new Date('2025/7/3'), recorrencias)
    expect(gerarExtrato.deuCerto).toBe(true)
    
    const extrato = gerarExtrato.instancia
    expect(extrato.transacoes).toHaveLength(2)
    expect(extrato.sumario.despesas).toBe(350)
})