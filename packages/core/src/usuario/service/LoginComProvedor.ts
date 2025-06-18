import { ProvedorAutenticacao } from '../../shared'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'
import Usuario from '../model/Usuario'

export default class LoginComProvedor implements CasoDeUso<string, Usuario | null> {
    constructor(
        private auth: ProvedorAutenticacao,
        private repo: RepositorioUsuario
    ) {}

    async executar(provedorId: string): Promise<Resultado<Usuario | null>> {
        const usuarioAuth = await this.auth.loginComProvedor?.(provedorId)
        const usuarioSinc = await this._sincronizarUsuario(usuarioAuth)
        if (usuarioSinc.deuErrado) return usuarioSinc.comoFalha
        return Resultado.ok(usuarioSinc.instancia)
    }

    private async _sincronizarUsuario(
        usuarioAuth?: Usuario | null
    ): Promise<Resultado<Usuario | null>> {
        if (!usuarioAuth || !usuarioAuth.email) return Resultado.nulo()

        const consultar = await this.repo.consultarPorEmail(usuarioAuth.email.valor)
        if (consultar.deuErrado) return consultar.comoFalha

        const usuarioExistente = consultar.instancia
        const novoUsuario = usuarioExistente
            ? Resultado.ok(usuarioExistente)
            : Resultado.ok(usuarioAuth)
        if (novoUsuario.deuErrado) return novoUsuario.comoFalha

        const usuario = novoUsuario.instancia
        if (!usuarioExistente) await this.repo.salvar(usuario)
        return Resultado.ok(usuario)
    }
}
