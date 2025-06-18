import { fn } from 'utils'
import AnoMesId from '../../shared/types/AnoMesId'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Resultado from '../../shared/base/Resultado'
import { Id } from '../..'

export interface SaldoProps extends EntidadeProps {
    data: Date
    acumulado: number
    creditos: number
    debitos: number
}

export default class Saldo extends Entidade<Saldo, SaldoProps> {
    private constructor(
        readonly id: Id,
        readonly data: Date,
        readonly acumulado: number,
        readonly creditos: number,
        readonly debitos: number,
        readonly props: SaldoProps
    ) {
        super(id)
    }

    static novos(props: SaldoProps[]): Resultado<Saldo[]> {
        return Resultado.combinar(props?.map(Saldo.novo) ?? [])
    }

    static vazio(data: Date): Resultado<Saldo> {
        return Saldo.novo({ data, acumulado: 0, creditos: 0, debitos: 0 })
    }

    static novo(props: SaldoProps): Resultado<Saldo> {
        const gerarAnoMes = AnoMesId.novo(props.data!)
        if (gerarAnoMes.deuErrado) return gerarAnoMes.comoFalha

        const gerarId = Id.novo(gerarAnoMes.instancia.valor)
        const id = gerarId.instancia

        return Resultado.ok(
            new Saldo(
                id,
                props.data,
                props.acumulado,
                props.creditos,
                props.debitos,
                fn.obj.manterAtribs(props, ['id', 'data', 'acumulado', 'creditos', 'debitos'])
            )
        )
    }
}
