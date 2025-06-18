import { fn, IdUnico } from 'utils'
import AnoMesId from '../../shared/types/AnoMesId'
import Cor from '../../shared/types/Cor'
import Descricao from '../../shared/types/Descricao'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Fatura, { FaturaProps } from './Fatura'
import Id from '../../shared/types/Id'
import Nome from '../../shared/types/Nome'
import Resultado from '../../shared/base/Resultado'

export interface CartaoProps extends EntidadeProps {
    descricao?: string
    bandeira?: string
    cor?: string
    faturas?: FaturaProps[]
}

export default class Cartao extends Entidade<Cartao, CartaoProps> {
    private constructor(
        readonly id: Id,
        readonly descricao: Descricao,
        readonly bandeira: Nome,
        readonly cor: Cor | null,
        readonly faturas: Fatura[],
        readonly props: CartaoProps
    ) {
        super(id)
    }

    static novos(props: CartaoProps[]): Resultado<Cartao[]> {
        return Resultado.combinar(props.map(Cartao.novo))
    }

    static novo(props: CartaoProps): Resultado<Cartao> {
        const cls = Cartao.constructor.name

        const id = Id.novo(props.id ?? IdUnico.gerar())
        const descricao = Descricao.nova(props.descricao!, { cls, atr: 'descricao' })
        const bandeira = Nome.novo(props.bandeira!, { cls, atr: 'bandeira' })
        const cor = props.cor ? Cor.nova(props.cor!, { cls, atr: 'cor' }) : Resultado.nulo()
        const faturas = Fatura.novas(props.faturas ?? [])

        const criarAtributos = Resultado.combinar<any>([id, descricao, bandeira, cor, faturas])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        return Resultado.ok(
            new Cartao(
                id.instancia,
                descricao.instancia,
                bandeira.instancia,
                cor.instancia,
                faturas.instancia,
                fn.obj.manterAtribs(
                    {
                        ...props,
                        faturas: faturas.instancia.map((f) => f.props),
                        id: id.instancia.valor,
                    },
                    ['id', 'descricao', 'bandeira', 'cor', 'faturas']
                )
            )
        )
    }

    fatura(data: Date): Fatura {
        return (
            this.faturas.find(
                (fatura) => fatura.id.valor === AnoMesId.novo(data).instancia.valor
            ) ?? Fatura.nova({ data, valor: 0, valorPlanejado: 0 }).instancia
        )
    }

    atualizarFatura(data: Date, valor: number): Cartao {
        const id = AnoMesId.novo(data).instancia
        const fatura = this.faturas.find((fatura) => fatura.id.valor === id.valor)
        const outrasFaturas = this.faturas.filter((fatura) => fatura.id.valor !== id.valor)

        const faturas = [
            ...outrasFaturas,
            Fatura.nova({ data, valor, valorPlanejado: fatura?.valorPlanejado ?? 0 }).instancia,
        ]
            .map((f) => f.props)
            .sort((a, b) => fn.str.ordenar(a.id!, b.id!))
        return Cartao.novo({ ...this.props, faturas }).instancia
    }
}
