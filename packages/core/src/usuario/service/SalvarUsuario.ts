import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'
import Usuario from '../model/Usuario'

export default class SalvarUsuario implements CasoDeUso<Usuario, void> {
    constructor(private repo: RepositorioUsuario) {}

    async executar(usuario: Usuario): Promise<Resultado<void>> {
        if(!usuario) return Resultado.falha('USUARIO_NULO')
        return this.repo.salvar(usuario)
    }
}
