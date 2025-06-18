import { IdUnico, TipoOperacao, TransacaoProps, ValorDetalhadoProps } from '../../../src'
import Transacao from '../../../src/extrato/model/Transacao'
import Resultado from '../../../src/shared/base/Resultado'

export default class TransacaoBuilder {
    private props: Partial<TransacaoProps> = {
        id: IdUnico.gerar(),
        nome: 'abc',
        valor: 100,
        data: new Date(),
        consolidada: false,
        operacao: TipoOperacao.DESPESA,
        observacoes: 'abc',
        contaId: IdUnico.gerar(),
        cartaoId: IdUnico.gerar(),
        categoriaId: IdUnico.gerar(),
        numeroParcela: 1,
        recorrenciaId: IdUnico.gerar(),
        emMemoria: false,
        virtual: false,
        agruparPor: 'abc',
    }

    static criar(): TransacaoBuilder {
        return new TransacaoBuilder()
    }

    comId(id: string): TransacaoBuilder {
        this.props.id = id
        return this
    }

    semId(): TransacaoBuilder {
        this.props.id = undefined
        return this
    }

    comNome(nome: string): TransacaoBuilder {
        this.props.nome = nome
        return this
    }

    semNome(): TransacaoBuilder {
        this.props.nome = undefined
        return this
    }

    comValor(valor: number): TransacaoBuilder {
        this.props.valor = valor
        return this
    }

    semValor(): TransacaoBuilder {
        this.props.valor = undefined
        return this
    }

    comData(data: Date): TransacaoBuilder {
        this.props.data = data
        return this
    }

    semData(): TransacaoBuilder {
        this.props.data = undefined
        return this
    }

    consolidada(): TransacaoBuilder {
        this.props.consolidada = true
        return this
    }

    naoConsolidada(): TransacaoBuilder {
        this.props.consolidada = false
        return this
    }

    comOperacao(operacao: TipoOperacao): TransacaoBuilder {
        this.props.operacao = operacao
        return this
    }

    semOperacao(): TransacaoBuilder {
        this.props.operacao = undefined
        return this
    }

    comObservacoes(observacoes: string): TransacaoBuilder {
        this.props.observacoes = observacoes
        return this
    }

    semObservacoes(): TransacaoBuilder {
        this.props.observacoes = undefined
        return this
    }

    comContaId(contaId: string): TransacaoBuilder {
        this.props.contaId = contaId
        return this
    }

    semContaId(): TransacaoBuilder {
        this.props.contaId = undefined
        return this
    }

    comCartaoId(cartaoId: string): TransacaoBuilder {
        this.props.cartaoId = cartaoId
        return this
    }

    semCartaoId(): TransacaoBuilder {
        this.props.cartaoId = undefined
        return this
    }

    comCategoriaId(categoriaId: string): TransacaoBuilder {
        this.props.categoriaId = categoriaId
        return this
    }

    semCategoriaId(): TransacaoBuilder {
        this.props.categoriaId = undefined
        return this
    }

    comNumeroParcela(numeroParcela: number): TransacaoBuilder {
        this.props.numeroParcela = numeroParcela
        return this
    }

    semNumeroParcela(): TransacaoBuilder {
        this.props.numeroParcela = undefined
        return this
    }

    comRecorrenciaId(recorrenciaId: string): TransacaoBuilder {
        this.props.recorrenciaId = recorrenciaId
        return this
    }

    semRecorrenciaId(): TransacaoBuilder {
        this.props.recorrenciaId = undefined
        return this
    }

    comValoresDetalhados(valoresDetalhados: ValorDetalhadoProps[]): TransacaoBuilder {
        this.props.valoresDetalhados = valoresDetalhados
        return this
    }

    semValoresDetalhados(): TransacaoBuilder {
        this.props.valoresDetalhados = undefined
        return this
    }

    emMemoria(): TransacaoBuilder {
        this.props.emMemoria = true
        return this
    }

    naoEmMemoria(): TransacaoBuilder {
        this.props.emMemoria = false
        return this
    }

    virtual(virtual: boolean): TransacaoBuilder {
        this.props.virtual = virtual
        return this
    }

    naoVirtual(): TransacaoBuilder {
        this.props.virtual = false
        return this
    }

    comAgruparPor(agruparPor: string): TransacaoBuilder {
        this.props.agruparPor = agruparPor
        return this
    }

    semAgruparPor(): TransacaoBuilder {
        this.props.agruparPor = undefined
        return this
    }

    avulsa(): TransacaoBuilder {
        this.props.recorrenciaId = undefined
        return this
    }

    receita(): TransacaoBuilder {
        this.props.operacao = TipoOperacao.RECEITA
        return this
    }

    obter(): Resultado<Transacao> {
        return Transacao.nova(this.props as TransacaoProps)
    }

    agora(): Transacao {
        return this.obter().instancia
    }

    toProps(): TransacaoProps {
        return this.props as TransacaoProps
    }
}
