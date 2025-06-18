import { IdUnico } from '../../../src'
import { TipoOperacao, ValorDetalhadoProps } from '../../../src/extrato/index'
import ValorDetalhado from '../../../src/extrato/model/ValorDetalhado'
import Resultado from '../../../src/shared/base/Resultado'

export default class ValorDetalhadoBuilder {
    private props: Partial<ValorDetalhadoProps> = {
        id: IdUnico.gerar(),
        descricao: 'descricao',
        valor: 0,
        operacao: TipoOperacao.DESPESA,
    }

    static criar(): ValorDetalhadoBuilder {
        return new ValorDetalhadoBuilder()
    }

    comId(id: string): ValorDetalhadoBuilder {
        this.props.id = id
        return this
    }

    semId(): ValorDetalhadoBuilder {
        this.props.id = undefined
        return this
    }

    comDescricao(descricao: string): ValorDetalhadoBuilder {
        this.props.descricao = descricao
        return this
    }

    semDescricao(): ValorDetalhadoBuilder {
        this.props.descricao = undefined
        return this
    }

    comValor(valor: number): ValorDetalhadoBuilder {
        this.props.valor = valor
        return this
    }

    semValor(): ValorDetalhadoBuilder {
        this.props.valor = undefined
        return this
    }

    comOperacao(operacao: TipoOperacao): ValorDetalhadoBuilder {
        this.props.operacao = operacao
        return this
    }

    semOperacao(): ValorDetalhadoBuilder {
        this.props.operacao = undefined
        return this
    }

    obter(): Resultado<ValorDetalhado> {
        return ValorDetalhado.novo(this.props as ValorDetalhadoProps)
    }

    agora(): ValorDetalhado {
        return this.obter().instancia
    }

    toProps(): ValorDetalhadoProps {
        return this.props as ValorDetalhadoProps
    }
}
