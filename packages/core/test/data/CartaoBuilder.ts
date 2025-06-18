import { CartaoProps, FaturaProps, TipoBandeira } from '../../src'
import { IdUnico } from 'utils'
import Cartao from '../../src/cartao/model/Cartao'
import FaturaBuilder from './FaturaBuilder'
import Resultado from '../../src/shared/base/Resultado'

export default class CartaoBuilder {
    constructor(private props: Partial<CartaoProps>) {}

    static criar(): CartaoBuilder {
        return new CartaoBuilder({
            id: IdUnico.gerar(),
            descricao: 'Cartão de NuBank',
            bandeira: TipoBandeira.MASTERCARD,
            faturas: [FaturaBuilder.criar().toProps()],
            cor: '#000000',
        })
    }

    comId(id: string): CartaoBuilder {
        this.props.id = id
        return this
    }

    semId(): CartaoBuilder {
        this.props.id = undefined
        return this
    }

    comDescricao(descricao: string): CartaoBuilder {
        this.props.descricao = descricao
        return this
    }

    semDescricao(): CartaoBuilder {
        this.props.descricao = undefined
        return this
    }

    comBandeira(bandeira: string): CartaoBuilder {
        this.props.bandeira = bandeira
        return this
    }

    semBandeira(): CartaoBuilder {
        this.props.bandeira = undefined
        return this
    }

    comCor(cor: string): CartaoBuilder {
        this.props.cor = cor
        return this
    }

    semCor(): CartaoBuilder {
        this.props.cor = undefined
        return this
    }

    comFaturas(faturas: FaturaProps[]): CartaoBuilder {
        this.props.faturas = faturas
        return this
    }

    semFaturas(): CartaoBuilder {
        this.props.faturas = undefined
        return this
    }

    obter(): Resultado<Cartao> {
        return Cartao.novo(this.props as CartaoProps)
    }

    agora(): Cartao {
        return this.obter().instancia
    }

    toProps(): CartaoProps {
        return this.props as CartaoProps
    }
}
