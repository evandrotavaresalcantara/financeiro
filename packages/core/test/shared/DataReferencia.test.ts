import { DataReferencia } from "../../src"

test('Deve gerar data', () => {
    const criarDt = DataReferencia.nova()
    const r1 = criarDt.instancia.permiteProximoMes()
    const r2 = criarDt.instancia.permiteMesAnterior()
    expect(r1 && r2).toBe(true)
})

test('Deve gerar data no mês seguinte', () => {
    const criarDt = DataReferencia.nova(new Date('2025/1/10'))
    const dt = criarDt.instancia.proximoMes()
    expect(dt.valor.getMonth()).toBe(1)
})

test('Deve gerar data no mês anterior', () => {
    const criarDt = DataReferencia.nova(new Date('2025/3/10'))
    const dt = criarDt.instancia.mesAnterior()
    expect(dt.valor.getMonth()).toBe(1)
})

test('Deve retornar falso para permite próximo mês', () => {
    const criarDt = DataReferencia.nova(DataReferencia.maiorData)
    const resultado = criarDt.instancia.permiteProximoMes()
    const dt = criarDt.instancia.proximoMes()
    expect(resultado).toBe(false)
    expect(dt).toBe(criarDt.instancia)
})

test('Deve retornar falso para permite mês anterior', () => {
    const criarDt = DataReferencia.nova(DataReferencia.menorData)
    const resultado = criarDt.instancia.permiteMesAnterior()
    const dt = criarDt.instancia.mesAnterior()
    expect(resultado).toBe(false)
    expect(dt).toBe(criarDt.instancia)
})

test('Deve falhar com data maior que dois anos', () => {
    const criarDt = DataReferencia.nova(new Date('2030/1/1'))
    expect(criarDt.deuErrado).toBe(true)
})

test('Deve falhar com data menor que 2010', () => {
    const criarDt = DataReferencia.nova(new Date('2009/1/1'))
    expect(criarDt.deuErrado).toBe(true)
})