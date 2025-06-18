import { Usuario } from '../../usuario'
import Cartao from '../model/Cartao'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default interface RepositorioCartao {
    salvar(usuario: Usuario, cartao: Cartao): Promise<Resultado<void>>
    salvarTodos(usuario: Usuario, cartoes: Cartao[]): Promise<Resultado<void>>
    consultar(usuario: Usuario): Promise<Resultado<Cartao[]>>
    excluir(usuario: Usuario, cartaoId: Id): Promise<Resultado<void>>
}
