import { Categoria } from '..'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Id from '../../shared/types/Id'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class ExcluirCategoria implements CasoDeUso<Categoria, void> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(categoria: Categoria, usuario: Usuario): Promise<Resultado<void>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        
        const criarId = Id.novo(categoria?.id.valor)
        if (criarId.deuErrado) return criarId.comoFalha
        return this.repo.excluir(usuario, criarId.instancia)
    }
}
