import { Cartao } from '../../src'
import CartaoBuilder from '../data/CartaoBuilder'

test('Deve instanciar um cartão com 4 atributos', () => {
    const criarCartao = CartaoBuilder.criar().obter()
    expect(criarCartao.deuCerto).toBe(true)

    const cartao = criarCartao.instancia
    const props = cartao.props
    expect(Object.keys(props).join(',')).toBe('id,descricao,bandeira,cor,faturas')
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarCartao = CartaoBuilder.criar()
        .comDescricao('abc')
        .comBandeira('def')
        .comCor('#CCC')
        .obter()
    const props = criarCartao.instancia.props
    expect(props.descricao).toBe('abc')
    expect(props.bandeira).toBe('def')
    expect(props.cor).toBe('#CCC')
})

test('Deve criar um cartão a partir de props válidas', () => {
    const props = CartaoBuilder.criar()
        .comDescricao('abc')
        .comBandeira('def')
        .comCor('#CCC')
        .toProps()
    const criarCartao = Cartao.novo(props)

    const cartao = criarCartao.instancia
    expect(cartao.descricao.valor).toBe('abc')
    expect(cartao.bandeira.valor).toBe('def')
    expect(cartao.cor?.valor).toBe('#CCC')
})

test('Deve criar cartão sem cor', () => {
    const criarCartao = CartaoBuilder.criar().semCor().obter()
    expect(criarCartao.deuCerto).toBe(true)
})

test('Deve criar cartão sem faturas', () => {
    const criarCartao = CartaoBuilder.criar().semFaturas().obter()
    expect(criarCartao.deuCerto).toBe(true)
})

test('Deve gerar erro ao criar cartão com props inválidas', () => {
    const props = CartaoBuilder.criar().semDescricao().comBandeira('def').comCor('#CCC').toProps()
    const criarCartao = Cartao.novo(props)
    expect(criarCartao.deuErrado).toBe(true)
})

test('Deve criar vários cartões', () => {
    const criarCartoes = Cartao.novos([
        CartaoBuilder.criar().toProps(),
        CartaoBuilder.criar().toProps(),
    ])
    expect(criarCartoes.deuCerto).toBe(true)
    expect(criarCartoes.instancia.length).toBe(2)
})

test('Deve criar cartão com faturas', () => {
    const criarCartao = CartaoBuilder.criar()
        .comFaturas([
            { data: new Date('2025/1/1'), valor: 4000 },
            { data: new Date('2025/2/1'), valor: 5500 },
        ])
        .obter()
    const cartao = criarCartao.instancia
    expect(cartao.fatura(new Date('2025/1/1')).valor).toBe(4000)
    expect(cartao.fatura(new Date('2025/2/1')).valor).toBe(5500)
})

test('Deve retornar fatura vazia para mês não existente', () => {
    const criarCartao = CartaoBuilder.criar().semFaturas().obter()
    const cartao = criarCartao.instancia
    expect(cartao.fatura(new Date('2025/1/1')).valor).toBe(0)
})

test('Deve atualizar fatura do cartão', () => {
    const criarCartao = CartaoBuilder.criar()
        .comFaturas([
            { data: new Date('2025/1/1'), valor: 4000 },
            { data: new Date('2025/2/1'), valor: 5500 },
        ])
        .obter()
    const cartao = criarCartao.instancia
    const novoCartao = cartao
        .atualizarFatura(new Date('2025/1/1'), 5000)
        .atualizarFatura(new Date('2025/3/1'), 6500)
    expect(novoCartao.fatura(new Date('2025/1/1')).valor).toBe(5000)
    expect(novoCartao.fatura(new Date('2025/2/1')).valor).toBe(5500)
    expect(novoCartao.fatura(new Date('2025/3/1')).valor).toBe(6500)
})
