import { SumarioProps, TransacaoProps } from '..'
import Props from '../../shared/base/Props'

export default interface GrupoTransacao extends Props {
    nome: string
    sumario: SumarioProps
    transacoes: TransacaoProps[]
}
