import Sumario from '../../src/extrato/model/Sumario'
import SumarioBuilder from '../data/extrato/SumarioBuilder'

test('Deve instanciar um objeto com 4 atributos', () => {
    const criarSumario = SumarioBuilder.criar().obter()
    expect(criarSumario.deuCerto).toBe(true)

    const sumario = criarSumario.instancia
    const props = sumario.props
    expect(Object.keys(props).join(',')).toBe('data,total,receitas,despesas')
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarSumario = SumarioBuilder.criar().comTotal(0).comReceitas(0).comDespesas(0).obter()

    const props = criarSumario.instancia.props
    expect(props.total).toBe(0)
    expect(props.receitas).toBe(0)
    expect(props.despesas).toBe(0)
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = SumarioBuilder.criar().comDespesas(2).comTotal(2).comReceitas(2).toProps()
    const criarSumario = Sumario.novo(props)

    const sumario = criarSumario.instancia
    expect(sumario.despesas).toBe(2)
    expect(sumario.total).toBe(0)
    expect(sumario.receitas).toBe(2)
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = SumarioBuilder.criar().semData().toProps()
    const criarSumario = Sumario.novo(props)
    expect(criarSumario.deuErrado).toBe(true)
})
