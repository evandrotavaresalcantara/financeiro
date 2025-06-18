import { SumarioProps, TipoOperacao, TransacaoProps } from '../../../src/extrato/index'
import Sumario from '../../../src/extrato/model/Sumario'
import Resultado from '../../../src/shared/base/Resultado'

export default class SumarioBuilder {
    private props: Partial<SumarioProps> = {
        data: new Date(),
        total: 0,
        receitas: 0,
        despesas: 0,
    }

    static criar(): SumarioBuilder {
        return new SumarioBuilder()
    }

    usandoTransacoes(transacoes: TransacaoProps[]): SumarioBuilder {
        transacoes.forEach((t) => {
            let receitas = 0
            let despesas = 0
            if (t.operacao === TipoOperacao.RECEITA) {
                receitas += t.valor
            } else {
                despesas += t.valor
            }

            this.props.receitas = receitas
            this.props.despesas = despesas
            this.props.total = receitas - despesas
        })
        return this
    }

    comData(data: Date): SumarioBuilder {
        const newDate = new Date(`${data.getFullYear()}/${data.getMonth() + 1}/1 12:00:00`)
        this.props.data = newDate
        return this
    }

    semData(): SumarioBuilder {
        this.props.data = undefined
        return this
    }

    comTotal(total: number): SumarioBuilder {
        this.props.total = total
        return this
    }

    semTotal(): SumarioBuilder {
        this.props.total = undefined
        return this
    }

    comReceitas(receitas: number): SumarioBuilder {
        this.props.receitas = receitas
        return this
    }

    semReceitas(): SumarioBuilder {
        this.props.receitas = undefined
        return this
    }

    comDespesas(despesas: number): SumarioBuilder {
        this.props.despesas = despesas
        return this
    }

    semDespesas(): SumarioBuilder {
        this.props.despesas = undefined
        return this
    }

    obter(): Resultado<Sumario> {
        return Sumario.novo(this.props as SumarioProps)
    }

    agora(): Sumario {
        return this.obter().instancia
    }

    toProps(): SumarioProps {
        return this.props as SumarioProps
    }
}
