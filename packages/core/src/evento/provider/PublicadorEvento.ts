import Evento from '../model/Evento'
import Resultado from '../../shared/base/Resultado'

export default interface PublicadorEvento {
    publicar(...eventos: Evento[]): Promise<Resultado<void>>
}
