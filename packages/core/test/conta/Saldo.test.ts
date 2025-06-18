import { Saldo } from '../../src'
import SaldoBuilder from '../data/SaldoBuilder'

test('Deve criar saldo', () => {
    const criarSaldo = Saldo.novo(SaldoBuilder.criar().toProps())
    expect(criarSaldo.deuCerto).toBe(true)
})

test('Deve criar saldos', () => {
    const criarSaldos = Saldo.novos([
        SaldoBuilder.criar().toProps(),
        SaldoBuilder.criar().toProps(),
        SaldoBuilder.criar().toProps(),
    ])
    expect(criarSaldos.deuCerto).toBe(true)
    expect(criarSaldos.instancia).toHaveLength(3)
})

test('Deve criar saldos vazios', () => {
    const criarSaldos = Saldo.novos(undefined as any)
    expect(criarSaldos.deuCerto).toBe(true)
    expect(criarSaldos.instancia).toHaveLength(0)
})

test('Deve criar saldo vazio', () => {
    const criarSaldos = Saldo.vazio(new Date())
    const saldo = criarSaldos.instancia
    expect(saldo.creditos).toBe(0)
    expect(saldo.debitos).toBe(0)
    expect(saldo.acumulado).toBe(0)
})

test('Deve gerar erro com data nula', () => {
    const criarSaldos = Saldo.novo({ data: null } as any)
    expect(criarSaldos.deuErrado).toBe(true)
})
