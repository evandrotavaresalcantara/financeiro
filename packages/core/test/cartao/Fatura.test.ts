import { Fatura } from '../../src'
import FaturaBuilder from '../data/FaturaBuilder'

test('Deve criar fatura', () => {
    const criarFatura = FaturaBuilder.criar().obter()
    expect(criarFatura.deuCerto).toBe(true)
})

test('Deve criar fatura sem valor e sem valor planejado', () => {
    const criarFatura = FaturaBuilder.criar().semValor().semValorPlanejado().obter()
    expect(criarFatura.deuCerto).toBe(true)
    expect(criarFatura.instancia).toBeDefined()
})

test('Deve criar várias faturas', () => {
    const faturas = [
        FaturaBuilder.criar().toProps(),
        FaturaBuilder.criar().toProps(),
        FaturaBuilder.criar().toProps(),
    ]
    const criarFaturas = Fatura.novas(faturas)
    expect(criarFaturas.deuCerto).toBe(true)
    expect(criarFaturas.instancia.length).toBe(3)
})

test('Deve criar faturas vazias', () => {
    const criarFaturas = Fatura.novas(undefined as any)
    expect(criarFaturas.deuCerto).toBe(true)
    expect(criarFaturas.instancia.length).toBe(0)
})

test('Deve gerar erro ao criar fatura sem data', () => {
    const criarFatura = FaturaBuilder.criar().semData().obter()
    expect(criarFatura.deuCerto).toBe(false)
    expect(criarFatura.instancia).toBeUndefined()
})
