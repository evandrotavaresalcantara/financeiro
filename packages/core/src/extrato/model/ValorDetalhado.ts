import { EntidadeProps } from '../../shared/base/Entidade'
import { IdUnico } from '../../shared'
import { TipoOperacao } from './TipoOperacao'
import Descricao from '../../shared/types/Descricao'
import Resultado from '../../shared/base/Resultado'

export interface ValorDetalhadoProps extends EntidadeProps {
    descricao: string
    valor: number
    operacao: TipoOperacao
}

export default class ValorDetalhado {
    constructor(
        readonly descricao: Descricao,
        readonly valor: number,
        readonly operacao: TipoOperacao,
        readonly props: ValorDetalhadoProps
    ) {}

    static novos(props: ValorDetalhadoProps[]): Resultado<ValorDetalhado[]> {
        return Resultado.combinar(props.map(ValorDetalhado.novo))
    }

    static novo(props: ValorDetalhadoProps): Resultado<ValorDetalhado> {
        const criarDescricao = Descricao.nova(props.descricao, { min: 0, max: 40 })
        if (criarDescricao.deuErrado) return criarDescricao.comoFalha

        const propsCompleto: Required<ValorDetalhadoProps> = {
            id: props.id ?? IdUnico.gerar(),
            descricao: criarDescricao.instancia.valor,
            valor: props.valor ?? 0,
            operacao: props.operacao ?? TipoOperacao.DESPESA,
        }

        return Resultado.ok(
            new ValorDetalhado(
                criarDescricao.instancia,
                propsCompleto.valor,
                propsCompleto.operacao,
                propsCompleto
            )
        )
    }

    get vazio(): boolean {
        return this.descricao.valor.trim() === '' && this.valor === 0
    }

    get valorReal(): number {
        return this.operacao === TipoOperacao.DESPESA ? -Math.abs(this.valor) : Math.abs(this.valor)
    }
}
