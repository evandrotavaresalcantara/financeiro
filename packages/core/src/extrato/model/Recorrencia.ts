import { fn, IdUnico } from 'utils'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'
import Transacao, { TransacaoProps } from './Transacao'

export interface RecorrenciaProps extends EntidadeProps {
    transacao?: TransacaoProps
    dataFim?: Date | null
    indefinida?: boolean
    iniciarNaParcela?: number
    qtdeDeParcelas?: number | null
}

export default class Recorrencia extends Entidade<Recorrencia, RecorrenciaProps> {
    constructor(
        readonly id: Id,
        readonly dataFim: Date | null,
        readonly indefinida: boolean,
        readonly iniciarNaParcela: number,
        readonly qtdeDeParcelas: number | null,
        readonly transacao: Transacao,
        readonly props: RecorrenciaProps
    ) {
        super(id)
    }

    static novas(props: RecorrenciaProps[]): Resultado<Recorrencia[]> {
        if (!props || props.length === 0) return Resultado.ok([])
        return Resultado.combinar(props.map(Recorrencia.nova))
    }

    static nova(props: RecorrenciaProps): Resultado<Recorrencia> {
        const criarTransacao = Transacao.nova(props.transacao!)

        if (criarTransacao.deuErrado) return criarTransacao.comoFalha

        const transacao = criarTransacao.instancia

        const parcelaMin = fn.num.min(props.iniciarNaParcela ?? 1, props.qtdeDeParcelas ?? 2)
        const parcelaMax = fn.num.max(props.iniciarNaParcela ?? 1, props.qtdeDeParcelas ?? 2)

        const propsCompleto: Required<RecorrenciaProps> = {
            id: props.id ?? IdUnico.gerar(),
            dataFim: props.dataFim ?? null,
            indefinida: props.indefinida ?? true,
            iniciarNaParcela: parcelaMin,
            qtdeDeParcelas: props.indefinida ? null : parcelaMax,
            transacao: transacao.props,
        }

        return Resultado.ok(
            new Recorrencia(
                Id.novo(propsCompleto.id).instancia,
                propsCompleto.dataFim,
                propsCompleto.indefinida,
                propsCompleto.iniciarNaParcela,
                propsCompleto.qtdeDeParcelas,
                transacao,
                propsCompleto
            )
        )
    }

    gerarParcela(ano: number, mes: number): Resultado<Transacao | null> {
        const dataRef = new Date(`${ano}/${mes}/01`)
        const transacao = this.transacao.props

        const dataInicial = transacao.data!
        const dataFinal = this.dataFim

        const dataParcela = this._calcularDataParcela(dataRef, dataInicial, dataFinal)
        if (!dataParcela) return Resultado.nulo()

        const numeroParcela =
            fn.dt.diferencaEmMeses(dataInicial, dataParcela) + this.iniciarNaParcela
        const parcelasFixas = !this.indefinida
        const parcelaInvalida = numeroParcela > (this.qtdeDeParcelas ?? 0)
        if (parcelasFixas && parcelaInvalida) return Resultado.nulo()

        const props: TransacaoProps = {
            ...transacao,
            nome: this._nome(numeroParcela),
            data: dataParcela,
            consolidada: false,
            recorrenciaId: this.id.valor,
            emMemoria: true,
            numeroParcela,
            id: IdUnico.gerar(),
        }

        return Transacao.nova(props)
    }

    private _calcularDataParcela(dataRef: Date, dataInicial: Date, dataFinal: Date | null) {
        if (fn.dt.mesmoMes(dataInicial, dataRef)) return dataInicial
        if (dataInicial > dataRef) return null

        let dataParcela = dataInicial
        while (fn.dt.emMesesDiferentes(dataParcela, dataRef)) {
            dataParcela = fn.dt.adicionarMeses(dataParcela, 1)
        }

        if (dataFinal && dataFinal < dataParcela) return null
        return dataParcela
    }

    private _nome(parcela: number): string {
        const nome = this.transacao.nome.valor
        const qtde = this.qtdeDeParcelas
        return this.indefinida ? nome : `${nome} (${parcela}/${qtde})`
    }
}
