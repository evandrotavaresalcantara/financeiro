import { fn } from 'utils'
import Conta from '../../src/conta/model/Conta'
import ContaBuilder from '../data/ContaBuilder'
import SaldoBuilder from '../data/SaldoBuilder'

test('Deve criar conta', () => {
    const criarConta = Conta.nova(ContaBuilder.criar().toProps())
    expect(criarConta.deuCerto).toBe(true)
})

test('Deve criar contas', () => {
    const criarConta = Conta.novas([
        ContaBuilder.criar().toProps(),
        ContaBuilder.criar().toProps(),
        ContaBuilder.criar().toProps(),
    ])
    expect(criarConta.deuCerto).toBe(true)
    expect(criarConta.instancia).toHaveLength(3)
})

test('Deve criar conta sem saldos', () => {
    const criarConta = Conta.nova(ContaBuilder.criar().semSaldos().toProps())
    const conta = criarConta.instancia
    expect(conta.saldo(new Date()).creditos).toBe(0)
})

test('Deve retornar o valor do saldo da conta', () => {
    const data = new Date('2025/1/1')
    const props = ContaBuilder.criar()
        .comSaldos([
            SaldoBuilder.criar().comCreditos(10000).comDebitos(3000).comData(data).toProps(),
        ])
        .toProps()
    const criarConta = Conta.nova(props)
    const conta = criarConta.instancia
    expect(conta.saldo(data).creditos).toBe(10000)
    expect(conta.saldo(data).debitos).toBe(3000)
})

test('Deve calcular o valor acumulado', () => {
    const datas = fn.dt.datasEntre(new Date('2022/1/1'), new Date('2024/1/1'))
    const saldos = datas.map((dt) =>
        SaldoBuilder.criar().comCreditos(10000).comAcumulado(10000).comData(dt).toProps()
    )
    const contaProps = ContaBuilder.criar()
        .comSaldos([
            ...saldos,
            {
                data: new Date('2025/1/1'),
            } as any,
        ])
        .toProps()

    const criarConta = Conta.nova(contaProps)
    expect(criarConta.deuCerto).toBe(true)

    const conta = criarConta.instancia
    expect(conta.saldos[0]!.acumulado).toBe(0)
    expect(conta.saldos[1]!.acumulado).toBe(10000)
    expect(conta.saldos[2]!.acumulado).toBe(20000)
    expect(conta.saldos[20]!.acumulado).toBe(200000)
})
