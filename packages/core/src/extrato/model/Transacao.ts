import { fn, IdUnico } from 'utils'
import { TipoOperacao } from './TipoOperacao'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Id from '../../shared/types/Id'
import Nome from '../../shared/types/Nome'
import Resultado from '../../shared/base/Resultado'
import ValorDetalhado, { ValorDetalhadoProps } from './ValorDetalhado'

export interface TransacaoProps extends EntidadeProps {
    nome: string
    valor: number
    data: Date
    consolidada?: boolean
    operacao: TipoOperacao
    observacoes?: string
    contaId?: string | null
    cartaoId?: string | null
    categoriaId?: string | null
    numeroParcela?: number | null
    recorrenciaId?: string | null
    valoresDetalhados?: ValorDetalhadoProps[]
    emMemoria?: boolean
    virtual?: boolean
    agruparPor?: string
}

export default class Transacao extends Entidade<Transacao, TransacaoProps> {
    constructor(
        readonly id: Id,
        readonly nome: Nome,
        readonly valor: number,
        readonly data: Date,
        readonly consolidada: boolean,
        readonly operacao: TipoOperacao,
        readonly observacoes: string,
        readonly contaId: string | null,
        readonly cartaoId: string | null,
        readonly categoriaId: string | null,
        readonly numeroParcela: number | null,
        readonly recorrenciaId: string | null,
        readonly valoresDetalhados: ValorDetalhado[],
        readonly emMemoria: boolean,
        readonly virtual: boolean,
        readonly agruparPor: string,
        readonly props: TransacaoProps
    ) {
        super(id)
    }

    static novas(props: TransacaoProps[]): Resultado<Transacao[]> {
        return Resultado.combinar(props.map(Transacao.nova))
    }

    static nova(props: TransacaoProps): Resultado<Transacao> {
        const id = Id.novo(props?.id ?? IdUnico.gerar())
        const nome = Nome.novo(props?.nome)
        const valores = ValorDetalhado.novos(props?.valoresDetalhados ?? [])

        const criarAtributos = Resultado.combinar<any>([id, nome, valores])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        const valoresVazios = valores.instancia.every((v) => v.vazio)
        const valorDetalhado = valores.instancia.reduce((acc, v) => acc + v.valorReal, 0)
        const opValorDetalhado = valorDetalhado >= 0 ? TipoOperacao.RECEITA : TipoOperacao.DESPESA

        const propsCompleto: Required<TransacaoProps> = {
            id: id.instancia.valor,
            nome: nome.instancia.valor,
            valor: valoresVazios ? Math.abs(props.valor) : Math.abs(valorDetalhado),
            data: props.data,
            consolidada: props.consolidada ?? false,
            operacao: valoresVazios ? props.operacao : opValorDetalhado,
            observacoes: props.observacoes ?? '',
            contaId: props.contaId ?? null,
            cartaoId: props.cartaoId ?? null,
            categoriaId: props.categoriaId ?? null,
            numeroParcela: props.numeroParcela ?? null,
            recorrenciaId: props.recorrenciaId ?? null,
            valoresDetalhados: valores.instancia.map((v) => v.props),
            emMemoria: props.emMemoria ?? false,
            virtual: props.virtual ?? false,
            agruparPor: props.agruparPor ?? '',
        }

        return Resultado.ok(
            new Transacao(
                id.instancia,
                nome.instancia,
                propsCompleto.valor,
                propsCompleto.data,
                propsCompleto.consolidada,
                propsCompleto.operacao,
                propsCompleto.observacoes,
                propsCompleto.contaId,
                propsCompleto.cartaoId,
                propsCompleto.categoriaId,
                propsCompleto.numeroParcela,
                propsCompleto.recorrenciaId,
                valores.instancia,
                propsCompleto.emMemoria,
                propsCompleto.virtual,
                propsCompleto.agruparPor,
                propsCompleto
            )
        )
    }

    static sort(t1: Transacao | TransacaoProps, t2: Transacao | TransacaoProps): number {
        const nome = (t: Transacao | TransacaoProps) =>
            t instanceof Transacao ? t.nome.valor : t.nome
        const data = (dt: Date) => fn.dtfmt.data(dt).yyyy.mm.dd.valor
        const s1 = `${data(t1.data)} - ${nome(t1)} - ${t1.valor} - ${t1.id}`
        const s2 = `${data(t2.data)} - ${nome(t2)} - ${t2.valor} - ${t2.id}`
        return fn.str.ordenar(s1, s2)
    }
}
