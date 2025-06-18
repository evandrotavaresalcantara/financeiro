import {
    ExtratoProps,
    GrupoTransacao,
    SumarioProps,
    TransacaoProps,
} from '../../../src/extrato/index'
import { AnoMesId, Id, IdUnico } from '../../../src'
import Extrato from '../../../src/extrato/model/Extrato'
import Resultado from '../../../src/shared/base/Resultado'
import SumarioBuilder from './SumarioBuilder'
import TransacaoBuilder from './TransacaoBuilder'

export default class ExtratoBuilder {
    private constructor(private props: Partial<ExtratoProps>) {}

    static criar(): ExtratoBuilder {
        const data = new Date()
        const transacoes = [TransacaoBuilder.criar().toProps()]
        const sumario = SumarioBuilder.criar().comData(data).usandoTransacoes(transacoes).toProps()
        return new ExtratoBuilder({
            id: Id.novo(AnoMesId.novo(data).instancia.valor).instancia.valor,
            data: data,
            sumario,
            transacoes,
            grupos: [
                {
                    nome: 'teste',
                    sumario,
                    transacoes,
                },
            ],
        })
    }

    comData(data: Date): ExtratoBuilder {
        this.props.data = data
        this.props.id = Id.novo(AnoMesId.novo(data).instancia.valor).instancia.valor
        return this
    }

    semData(): ExtratoBuilder {
        this.props.data = undefined
        return this
    }

    comSumario(sumario: SumarioProps): ExtratoBuilder {
        this.props.sumario = sumario
        return this
    }

    semSumario(): ExtratoBuilder {
        this.props.sumario = undefined
        return this
    }

    comTransacoes(transacoes: TransacaoProps[]): ExtratoBuilder {
        this.props.transacoes = transacoes
        this.props.sumario = SumarioBuilder.criar()
            .comData(this.props.data!)
            .usandoTransacoes(transacoes)
            .toProps()
        return this
    }

    semTransacoes(): ExtratoBuilder {
        this.props.transacoes = undefined
        return this
    }

    comGrupos(grupos: GrupoTransacao[]): ExtratoBuilder {
        this.props.grupos = grupos
        return this
    }

    semGrupos(): ExtratoBuilder {
        this.props.grupos = undefined
        return this
    }

    obter(): Resultado<Extrato> {
        return Extrato.novo(this.props as ExtratoProps)
    }

    agora(): Extrato {
        return this.obter().instancia
    }

    toProps(): ExtratoProps {
        return this.props as ExtratoProps
    }
}
