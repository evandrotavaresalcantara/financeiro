import { RecorrenciaProps } from 'core'
import TransacaoDTO from './TransacaoDTO'

export default interface RecorrenciaDTO extends RecorrenciaProps {
    transacao?: TransacaoDTO
}
