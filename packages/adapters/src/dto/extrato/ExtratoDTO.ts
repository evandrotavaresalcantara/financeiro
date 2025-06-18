import { ExtratoProps } from 'core'
import GrupoTransacaoDTO from './GrupoTransacaoDTO'
import SumarioDTO from './SumarioDTO'
import TransacaoDTO from './TransacaoDTO'

export default interface ExtratoDTO extends ExtratoProps {
    sumario?: SumarioDTO
    transacoes: TransacaoDTO[]
    grupos?: GrupoTransacaoDTO[]
}
