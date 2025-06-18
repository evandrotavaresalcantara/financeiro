import { FaturaProps } from '../../src'
import { IdUnico } from 'utils'
import Resultado from '../../src/shared/base/Resultado'
import Fatura from '../../src/cartao/model/Fatura'

export default class FaturaBuilder {
    private props: Partial<FaturaProps> = {
        id: IdUnico.gerar(),
        data: new Date(),
        valor: 60,
        valorPlanejado: 50,
    }

    static criar(): FaturaBuilder {
        return new FaturaBuilder()
    }

    comId(id: string): FaturaBuilder {
        this.props.id = id
        return this
    }

    semId(): FaturaBuilder {
        this.props.id = undefined
        return this
    }

    comData(data: Date): FaturaBuilder {
        this.props.data = data
        return this
    }

    semData(): FaturaBuilder {
        this.props.data = undefined
        return this
    }

    comValor(valor: number): FaturaBuilder {
        this.props.valor = valor
        return this
    }

    semValor(): FaturaBuilder {
        this.props.valor = undefined
        return this
    }

    comValorPlanejado(valorPlanejado: number): FaturaBuilder {
        this.props.valorPlanejado = valorPlanejado
        return this
    }

    semValorPlanejado(): FaturaBuilder {
        this.props.valorPlanejado = undefined
        return this
    }

    obter(): Resultado<Fatura> {
        return Fatura.nova(this.props as FaturaProps)
    }

    agora(): Fatura {
        return this.obter().instancia
    }

    toProps(): FaturaProps {
        return this.props as FaturaProps
    }
}
