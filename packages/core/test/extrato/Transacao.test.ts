import { TipoOperacao } from '../../src'
import Transacao from '../../src/extrato/model/Transacao'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'

test('Deve instanciar um objeto com 16 atributos', () => {
    const criarTransacao = TransacaoBuilder.criar().obter()
    expect(criarTransacao.deuCerto).toBe(true)

    const cartao = criarTransacao.instancia
    const props = cartao.props
    expect(Object.keys(props).join(',')).toBe(
        'id,nome,valor,data,consolidada,operacao,observacoes,contaId,cartaoId,categoriaId,numeroParcela,recorrenciaId,valoresDetalhados,emMemoria,virtual,agruparPor'
    )
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarCartao = TransacaoBuilder.criar()
        .comNome('abc')
        .comValor(100)
        .comData(new Date())
        .naoConsolidada()
        .comOperacao(TipoOperacao.DESPESA)
        .comObservacoes('abc')
        .comContaId('abc')
        .comCartaoId('abc')
        .comCategoriaId('abc')
        .comNumeroParcela(1)
        .comRecorrenciaId('abc')
        .comValoresDetalhados([
            {
                id: 'abc',
                descricao: 'abc',
                valor: 100,
                operacao: TipoOperacao.DESPESA,
            },
        ])
        .naoEmMemoria()
        .virtual(false)
        .comAgruparPor('abc')
        .obter()

    const props = criarCartao.instancia.props
    expect(props.nome).toBe('abc')
    expect(props.valor).toBe(100)
    expect(props.data).toBeInstanceOf(Date)
    expect(props.consolidada).toBe(false)
    expect(props.operacao).toBe(TipoOperacao.DESPESA)
    expect(props.observacoes).toBe('abc')
    expect(props.contaId).toBe('abc')
    expect(props.cartaoId).toBe('abc')
    expect(props.categoriaId).toBe('abc')
    expect(props.numeroParcela).toBe(1)
    expect(props.recorrenciaId).toBe('abc')
    expect(props.valoresDetalhados).toHaveLength(1)
    expect(props.valoresDetalhados && props.valoresDetalhados[0]!.id).toBe('abc')
    expect(props.valoresDetalhados && props.valoresDetalhados[0]!.descricao).toBe('abc')
    expect(props.valoresDetalhados && props.valoresDetalhados[0]!.valor).toBe(100)
    expect(props.valoresDetalhados && props.valoresDetalhados[0]!.operacao).toBe(TipoOperacao.DESPESA)
    expect(props.valoresDetalhados && props.emMemoria).toBe(false)
    expect(props.virtual).toBe(false)
    expect(props.agruparPor).toBe('abc')
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = TransacaoBuilder.criar()
        .comNome('abc')
        .comValor(100)
        .comData(new Date())
        .naoConsolidada()
        .comOperacao(TipoOperacao.DESPESA)
        .comObservacoes('abc')
        .comContaId('abc')
        .comCartaoId('abc')
        .comCategoriaId('abc')
        .comNumeroParcela(1)
        .comRecorrenciaId('abc')
        .comValoresDetalhados([
            {
                id: 'abc',
                descricao: 'abc',
                valor: 100,
                operacao: TipoOperacao.DESPESA,
            },
        ])
        .naoEmMemoria()
        .virtual(false)
        .comAgruparPor('abc')
        .toProps()

    const criarTransacao = Transacao.nova(props)

    const transacao = criarTransacao.instancia

    expect(transacao.nome.valor).toBe('abc')
    expect(transacao.valor).toBe(100)
    expect(transacao.data).toBeInstanceOf(Date)
    expect(transacao.consolidada).toBe(false)
    expect(transacao.operacao).toBe(TipoOperacao.DESPESA)
    expect(transacao.observacoes).toBe('abc')
    expect(transacao.contaId).toBe('abc')
    expect(transacao.cartaoId).toBe('abc')
    expect(transacao.categoriaId).toBe('abc')
    expect(transacao.numeroParcela).toBe(1)
    expect(transacao.recorrenciaId).toBe('abc')
    expect(transacao.valoresDetalhados).toHaveLength(1)
    expect(transacao.valoresDetalhados && transacao.valoresDetalhados[0]!.descricao.valor).toBe(
        'abc'
    )
    expect(transacao.valoresDetalhados && transacao.valoresDetalhados[0]!.valor).toBe(100)
    expect(transacao.valoresDetalhados && transacao.valoresDetalhados[0]!.operacao).toBe(
        TipoOperacao.DESPESA
    )
    expect(transacao.valoresDetalhados && transacao.emMemoria).toBe(false)
    expect(transacao.virtual).toBe(false)
    expect(transacao.agruparPor).toBe('abc')
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = TransacaoBuilder.criar()
        .semNome()
        .semValor()
        .semData()
        .naoConsolidada()
        .semOperacao()
        .semObservacoes()
        .semContaId()
        .semCartaoId()
        .semCategoriaId()
        .semNumeroParcela()
        .semRecorrenciaId()
        .semValoresDetalhados()
        .semAgruparPor()
        .naoVirtual()
        .naoEmMemoria()
        .toProps()

    const criarTransacao = Transacao.nova(props)
    expect(criarTransacao.deuErrado).toBe(true)
})
