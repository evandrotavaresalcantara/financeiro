import { Usuario } from '../../usuario'
import Resultado from './Resultado'

export default interface CasoDeUso<E, S> {
    executar(dados: E, usuario?: Usuario): Promise<Resultado<S>>
}
