import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Categoria from '../model/Categoria'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class SalvarCategoria implements CasoDeUso<Categoria, void> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(categoria: Categoria, usuario: Usuario): Promise<Resultado<void>> {
        return this.repo.salvar(usuario, categoria)
    }
}
