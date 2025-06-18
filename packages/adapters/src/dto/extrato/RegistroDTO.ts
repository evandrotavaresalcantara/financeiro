import TransacaoDTO from './TransacaoDTO'
import RecorrenciaDTO from './RecorrenciaDTO'

export default interface RegistroDTO {
    transacao: TransacaoDTO
    recorrencia?: RecorrenciaDTO
    tipo: 'recorrencia' | 'avulsa'
}
