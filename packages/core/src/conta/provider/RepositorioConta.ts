import { Usuario } from '../../usuario'
import Conta from '../model/Conta'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default interface RepositorioConta {
    salvar(usuario: Usuario, conta: Conta): Promise<Resultado<void>>
    salvarTodas(usuario: Usuario, contas: Conta[]): Promise<Resultado<void>>
    consultar(usuario: Usuario): Promise<Resultado<Conta[]>>
    excluir(usuario: Usuario, contaId: Id): Promise<Resultado<void>>
}
