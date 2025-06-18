import { AnoMesId, ExtratoProps } from '../../src'
import Extrato from '../../src/extrato/model/Extrato'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import GerarSumario from '../../src/extrato/model/GerarSumario'
import Sumario from '../../src/extrato/model/Sumario'
import SumarioBuilder from '../data/extrato/SumarioBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

function gerarSumario(extrato: ExtratoProps): Sumario {
    if (extrato.transacoes?.length) return GerarSumario.com(extrato.data, extrato.transacoes)
    if (extrato.sumario) return Sumario.novo(extrato.sumario).instancia
    return Sumario.vazio(extrato.data).instancia
}

test('Deve instanciar um objeto com 4 atributos', () => {
    const criarExtrato = ExtratoBuilder.criar().obter()
    expect(criarExtrato.deuCerto).toBe(true)

    const extrato = criarExtrato.instancia
    const props = extrato.props
    expect(Object.keys(props).join(',')).toBe('id,data,sumario,transacoes,grupos')
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarExtrato = ExtratoBuilder.criar()
        .comData(new Date())
        .comSumario(SumarioBuilder.criar().toProps())
        .comTransacoes([TransacaoBuilder.criar().toProps()])
        .comGrupos([
            {
                nome: 'teste',
                sumario: SumarioBuilder.criar().toProps(),
                transacoes: [TransacaoBuilder.criar().toProps()],
            },
        ])
        .obter()

    const props = criarExtrato.instancia.props
    expect(props.id).toBeTruthy()
    expect(props.data).toBeInstanceOf(Date)
    expect(props.sumario).toBeTruthy()
    expect(props.transacoes).toBeTruthy()
    expect(props.grupos).toBeTruthy()
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = ExtratoBuilder.criar()
        .comData(new Date())
        .comSumario(SumarioBuilder.criar().toProps())
        .comTransacoes([TransacaoBuilder.criar().toProps()])
        .comGrupos([
            {
                nome: 'teste',
                sumario: SumarioBuilder.criar().toProps(),
                transacoes: [TransacaoBuilder.criar().toProps()],
            },
        ])
        .toProps()
    const criarExtrato = Extrato.novo(props)

    const extrato = criarExtrato.instancia
    expect(extrato.id.valor).toBe(AnoMesId.novo(props.data).instancia.valor)
    expect(extrato.data).toBeInstanceOf(Date)
    expect(extrato.sumario).toStrictEqual(gerarSumario(props))
    expect(extrato.transacoes).toBeTruthy()
    expect(extrato.grupos).toBeTruthy()
})
