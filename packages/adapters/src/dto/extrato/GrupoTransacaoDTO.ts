import { GrupoTransacao } from 'core'
import SumarioDTO from './SumarioDTO'
import TransacaoDTO from './TransacaoDTO'

export default interface GrupoTransacaoDTO extends GrupoTransacao {
    sumario: SumarioDTO
    transacoes: TransacaoDTO[]
}
