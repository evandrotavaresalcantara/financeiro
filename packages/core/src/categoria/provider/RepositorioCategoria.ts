import { Usuario } from '../../usuario'
import Categoria from '../model/Categoria'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default interface RepositorioCategoria {
    salvar(usuario: Usuario, categoria: Categoria): Promise<Resultado<void>>
    salvarTodas(usuario: Usuario, categorias: Categoria[]): Promise<Resultado<void>>
    consultar(usuario: Usuario): Promise<Resultado<Categoria[]>>
    excluir(usuario: Usuario, categoriaId: Id): Promise<Resultado<void>>
}
