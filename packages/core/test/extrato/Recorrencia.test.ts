import { TipoOperacao } from '../../src'
import Recorrencia from '../../src/extrato/model/Recorrencia'
import RecorrenciaBuilder from '../data/extrato/RecorrenciaBuilder'

test('Deve instanciar um objeto com 4 atributos', () => {
    const criarRecorrencia = RecorrenciaBuilder.criar().obter()
    expect(criarRecorrencia.deuCerto).toBe(true)

    const recorrencia = criarRecorrencia.instancia
    const props = recorrencia.props
    expect(Object.keys(props).join(',')).toBe(
        'id,dataFim,indefinida,iniciarNaParcela,qtdeDeParcelas,transacao'
    )
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarRecorrencia = RecorrenciaBuilder.criar()
        .comId('abc')
        .comDataFim(new Date())
        .indefinida(false)
        .comIniciarNaParcela(1)
        .comQtdeDeParcelas(10)
        .comTransacao({
            id: '1',
            nome: 'Transação',
            valor: 100,
            data: new Date(),
            consolidada: false,
            operacao: TipoOperacao.DESPESA,
            observacoes: 'Observações',
        })
        .obter()

    const props = criarRecorrencia.instancia.props

    expect(props.id).toBe('abc')
    expect(props.dataFim).toBeInstanceOf(Date)
    expect(props.indefinida).toBe(false)
    expect(props.iniciarNaParcela).toBe(1)
    expect(props.qtdeDeParcelas).toBe(10)
    expect(props.transacao?.valor).toBe(100)
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = RecorrenciaBuilder.criar()
        .comId('abc')
        .comDataFim(new Date())
        .indefinida(false)
        .comIniciarNaParcela(1)
        .comQtdeDeParcelas(10)
        .comTransacao({
            id: '1',
            nome: 'Transação',
            valor: 100,
            data: new Date(),
            consolidada: false,
            operacao: TipoOperacao.DESPESA,
            observacoes: 'Observações',
        })
        .toProps()
    const criarRecorrencia = Recorrencia.nova(props)

    const recorrencia = criarRecorrencia.instancia

    expect(recorrencia.id.valor).toBe('abc')
    expect(recorrencia.dataFim).toBeInstanceOf(Date)
    expect(recorrencia.indefinida).toBe(false)
    expect(recorrencia.iniciarNaParcela).toBe(1)
    expect(recorrencia.qtdeDeParcelas).toBe(10)
    expect(recorrencia.transacao?.valor).toBe(100)
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = RecorrenciaBuilder.criar()
        .semDataFim()
        .semId()
        .semIniciarNaParcela()
        .semQtdeDeParcelas()
        .semTransacao()
        .toProps()

    const criarRecorrencia = Recorrencia.nova(props)
    expect(criarRecorrencia.deuErrado).toBe(true)
})
