import { TipoOperacao } from "../../src"
import ValorDetalhado from "../../src/extrato/model/ValorDetalhado"
import ValorDetalhadoBuilder from "../data/extrato/ValorDetalhadoBuilder"

test('Deve instanciar um objeto com 4 atributos', () => {
    const criarValorDetalhado = ValorDetalhadoBuilder.criar().obter()
    expect(criarValorDetalhado.deuCerto).toBe(true)

    const valorDetalhado = criarValorDetalhado.instancia
    const props = valorDetalhado.props
    expect(Object.keys(props).join(',')).toBe('id,descricao,valor,operacao')
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarValorDetalhado = ValorDetalhadoBuilder.criar()
        .comDescricao('abc')
        .comId('1')
        .comValor(10)
        .comOperacao(TipoOperacao.DESPESA)
        .obter()

    const props = criarValorDetalhado.instancia.props
    expect(props.descricao).toBe('abc')
    expect(props.id).toBe('1')
    expect(props.operacao).toBe(TipoOperacao.DESPESA)
    expect(props.valor).toBe(10)
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = ValorDetalhadoBuilder.criar().comDescricao('abc').comId('1').comValor(10).comOperacao(TipoOperacao.DESPESA).toProps()
    const criarValorDetalhado = ValorDetalhado.novo(props)

    const valorDetalhado = criarValorDetalhado.instancia
    expect(valorDetalhado.descricao.valor).toBe('abc')
    expect(valorDetalhado.valor).toBe(10)
    expect(valorDetalhado.operacao).toBe(TipoOperacao.DESPESA)
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = ValorDetalhadoBuilder.criar().semDescricao().semId().semOperacao().semValor().toProps()
    const criarValorDetalhado = ValorDetalhado.novo(props)
    expect(criarValorDetalhado.deuErrado).toBe(true)
})