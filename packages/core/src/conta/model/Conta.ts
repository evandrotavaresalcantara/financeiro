import { fn, IdUnico } from 'utils'
import AnoMesId from '../../shared/types/AnoMesId'
import Cor from '../../shared/types/Cor'
import Descricao from '../../shared/types/Descricao'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Id from '../../shared/types/Id'
import Nome from '../../shared/types/Nome'
import Resultado from '../../shared/base/Resultado'
import Saldo, { SaldoProps } from './Saldo'

export interface ContaProps extends EntidadeProps {
    descricao?: string
    banco?: string
    cor?: string
    saldos?: SaldoProps[]
}

export default class Conta extends Entidade<Conta, ContaProps> {
    private constructor(
        readonly id: Id,
        readonly descricao: Descricao,
        readonly banco: Nome,
        readonly cor: Cor | null,
        readonly saldos: Saldo[],
        readonly props: ContaProps
    ) {
        super(id)
    }

    static novas(props: ContaProps[]): Resultado<Conta[]> {
        return Resultado.combinar(props.map(Conta.nova))
    }

    static nova(props: ContaProps): Resultado<Conta> {
        const cls = Conta.constructor.name

        const id = Id.novo(props.id ?? IdUnico.gerar())
        const descricao = Descricao.nova(props.descricao!, { cls, atr: 'descricao' })
        const banco = Nome.novo(props.banco!, { cls, atr: 'banco', min: 0 })
        const cor = props.cor ? Cor.nova(props.cor!, { cls, atr: 'cor' }) : Resultado.nulo()
        const saldos = Saldo.novos(Conta.calcularAcumulados(props.saldos ?? []))

        const criarAtributos = Resultado.combinar<any>([id, descricao, banco, cor, saldos])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        return Resultado.ok(
            new Conta(
                id.instancia,
                descricao.instancia,
                banco.instancia,
                cor.instancia,
                saldos.instancia,
                fn.obj.manterAtribs(
                    {
                        ...props,
                        saldos: saldos.instancia.map((s) => s.props),
                        id: id.instancia.valor,
                    },
                    ['id', 'descricao', 'banco', 'cor', 'saldos']
                )
            )
        )
    }

    saldo(data: Date): Saldo {
        const mesmoId = (saldo: Saldo) => saldo.id.valor === AnoMesId.novo(data).instancia.valor
        const saldoVazio = Saldo.novo({ data, creditos: 0, debitos: 0, acumulado: 0 }).instancia
        return this.saldos.find(mesmoId) ?? saldoVazio
    }

    private static calcularAcumulados(props: SaldoProps[]): SaldoProps[] {
        if(!props.length) return []
        
        const todas = props.map((d) => d.data).filter(d => d)
        const min = fn.dt.primeiroDiaDoMes(fn.dt.min(...todas)!)
        const max = fn.dt.ultimoDiaDoMes(fn.dt.max(...todas)!)
        
        const datas = fn.dt.mesesEntre(min, max)

        return datas.reduce((saldos, data) => {
            const id = AnoMesId.novo(data).instancia.valor
            const ultimo = saldos[saldos.length - 1]
            const saldo = props.find((s) => id === AnoMesId.novo(s.data).instancia?.valor)

            const saldoCompleto: SaldoProps = {
                id,
                data,
                creditos: saldo?.creditos ?? 0,
                debitos: saldo?.debitos ?? 0,
                acumulado:
                    (ultimo?.acumulado ?? 0) + (ultimo?.creditos ?? 0) - (ultimo?.debitos ?? 0),
            }
            return [...saldos, saldoCompleto]
        }, [] as SaldoProps[])
    }
}
