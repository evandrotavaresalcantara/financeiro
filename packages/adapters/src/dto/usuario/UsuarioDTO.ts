import { UsuarioProps } from 'core'
import UsuarioConfigDTO from './UsuarioConfigDTO'

export default interface UsuarioDTO extends UsuarioProps {
    config: UsuarioConfigDTO
}
