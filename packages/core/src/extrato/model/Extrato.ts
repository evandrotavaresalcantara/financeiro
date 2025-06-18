import { DataReferencia, Id } from '../../shared'
import { fn } from 'utils'
import AgruparTransacoes from './AgruparTransacoes'
import AnoMesId from '../../shared/types/AnoMesId'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import GerarSumario from './GerarSumario'
import GrupoTransacao from './GrupoTransacao'
import Resultado from '../../shared/base/Resultado'
import Sumario, { SumarioProps } from './Sumario'
import Transacao, { TransacaoProps } from './Transacao'

export interface ExtratoProps extends EntidadeProps {
    data: Date
    sumario?: SumarioProps
    transacoes: TransacaoProps[]
    grupos?: GrupoTransacao[]
}

export default class Extrato extends Entidade<Extrato, ExtratoProps> {
    constructor(
        readonly id: Id,
        readonly data: Date,
        readonly sumario: Sumario,
        readonly transacoes: Transacao[],
        readonly grupos: GrupoTransacao[],
        readonly props: ExtratoProps
    ) {
        super(id)
    }

    static novos(props: ExtratoProps[]): Resultado<Extrato[]> {
        return Resultado.combinar(props.map(Extrato.novo))
    }

    static novo(props: ExtratoProps): Resultado<Extrato> {
        const gerarAnoMes = AnoMesId.novo(props.data!)
        if (gerarAnoMes.deuErrado) return gerarAnoMes.comoFalha

        const gerarId = Id.novo(gerarAnoMes.instancia.valor)

        const gerarTransacoes = Transacao.novas(props.transacoes ?? [])
        const dataReferencia = DataReferencia.nova(props.data)

        const criarAtributos = Resultado.combinar<any>([gerarId, gerarTransacoes, dataReferencia])
        if (criarAtributos.deuErrado) return criarAtributos.comoFalha

        const transacoes = gerarTransacoes.instancia

        const sumario = Extrato.gerarSumario(props)
        const grupos = AgruparTransacoes.com(transacoes)

        const propsCompleto: Required<ExtratoProps> = {
            id: gerarId.instancia.valor,
            data: props.data,
            sumario: sumario.props,
            transacoes: transacoes.map((t) => t.props),
            grupos: grupos,
        }

        return Resultado.ok(
            new Extrato(
                gerarId.instancia,
                propsCompleto.data,
                sumario,
                transacoes,
                grupos,
                fn.obj.manterAtribs(propsCompleto, [
                    'id',
                    'data',
                    'sumario',
                    'faturas',
                    'transacoes',
                    'grupos',
                ])
            )
        )
    }

    private static gerarSumario(extrato: ExtratoProps): Sumario {
        if (extrato.transacoes?.length) return GerarSumario.com(extrato.data, extrato.transacoes)
        if (extrato.sumario) return Sumario.novo(extrato.sumario).instancia
        return Sumario.vazio(extrato.data).instancia
    }
}
