import { AnoMesId, SaldoProps } from '../../src'
import Resultado from '../../src/shared/base/Resultado'
import Saldo from '../../src/conta/model/Saldo'

export default class SaldoBuilder {
    private props: Partial<SaldoProps> = {
        id: AnoMesId.novo(new Date()).instancia.valor,
        data: new Date(),
        creditos: 0,
        debitos: 0,
        acumulado: 0,
    }

    static criar(): SaldoBuilder {
        return new SaldoBuilder()
    }

    comData(dt: Date): SaldoBuilder {
        this.props.id = AnoMesId.novo(dt).instancia.valor
        this.props.data = dt
        return this
    }

    comCreditos(creditos: number): SaldoBuilder {
        this.props.creditos = creditos
        return this
    }

    comDebitos(debitos: number): SaldoBuilder {
        this.props.debitos = debitos
        return this
    }

    comAcumulado(acumulado: number): SaldoBuilder {
        this.props.acumulado! += acumulado
        return this
    }

    obter(): Resultado<Saldo> {
        return Saldo.novo(this.props as SaldoProps)
    }

    agora(): Saldo {
        return this.obter().instancia
    }

    toProps(): SaldoProps {
        return this.props as SaldoProps
    }
}
