import { fn } from 'utils'
import Props from '../../shared/base/Props'
import Resultado from '../../shared/base/Resultado'

export interface SumarioProps extends Props {
    data: Date
    total?: number
    receitas: number
    despesas: number
}

export default class Sumario {
    private constructor(
        readonly data: Date,
        readonly total: number,
        readonly receitas: number,
        readonly despesas: number,
        readonly props: SumarioProps
    ) {}

    static vazio(data: Date): Resultado<Sumario> {
        return Sumario.novo({ data, receitas: 0, despesas: 0 })
    }

    static novos(props: SumarioProps[]): Resultado<Sumario[]> {
        return Resultado.combinar(props.map(Sumario.novo))
    }

    static novo(props: SumarioProps): Resultado<Sumario> {
        if (!props?.data)
            return Resultado.falha({
                tipo: 'DATA_INVALIDA',
                atr: 'data',
                cls: 'SumarioProps',
            })

        const receitas = props.receitas ?? 0
        const despesas = props.despesas ?? 0
        const propsCompleto: Required<SumarioProps> = {
            data: new Date(`${props.data.getFullYear()}/${props.data.getMonth() + 1}/1 12:00:00`),
            total: receitas - despesas,
            receitas,
            despesas,
        }

        return Resultado.ok(
            new Sumario(
                propsCompleto.data,
                propsCompleto.total,
                propsCompleto.receitas,
                propsCompleto.despesas,
                fn.obj.manterAtribs(propsCompleto, ['data', 'total', 'receitas', 'despesas'])
            )
        )
    }
}
