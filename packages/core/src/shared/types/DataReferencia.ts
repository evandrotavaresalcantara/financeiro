import { fn } from 'utils'
import Resultado from '../base/Resultado'
import VO from '../base/VO'

export default class DataReferencia extends VO<Date, {}> {
    static readonly ERRO_MENOR = 'DATA_DEF_MENOR'
    static readonly ERRO_MAIOR = 'DATA_DEF_MAIOR'
    static readonly menorData = new Date('2010/1/1')

    private constructor(readonly valor: Date) {
        super(valor, {})
    }

    static get maiorData() {
        return fn.dt.adicionarAnos(new Date(), 2)
    }

    static nova(valor?: Date | null): Resultado<DataReferencia> {
        const dt = valor ?? new Date()
        const { ERRO_MENOR, ERRO_MAIOR, menorData, maiorData } = DataReferencia

        if (dt < menorData && !fn.dt.mesmoMes(dt, menorData)) {
            return Resultado.falha({ tipo: ERRO_MENOR, detalhes: { maiorData, data: dt } })
        }

        if (dt > maiorData && !fn.dt.mesmoMes(dt, maiorData)) {
            return Resultado.falha({ tipo: ERRO_MAIOR, detalhes: { maiorData, data: dt } })
        }

        return Resultado.ok(new DataReferencia(dt))
    }

    permiteProximoMes() {
        return fn.dt.adicionarMeses(this.valor, 1) < DataReferencia.maiorData
    }

    proximoMes() {
        if (!this.permiteProximoMes()) return this
        return DataReferencia.nova(fn.dt.adicionarMeses(this.valor, 1)).instancia
    }

    permiteMesAnterior() {
        return fn.dt.subtrairMeses(this.valor, 1) > DataReferencia.menorData
    }

    mesAnterior() {
        if (!this.permiteMesAnterior()) return this
        return DataReferencia.nova(fn.dt.subtrairMeses(this.valor, 1)).instancia
    }
}
