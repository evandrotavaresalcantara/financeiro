import {
    LoginComProvedor,
    Logout,
    MonitorarAutenticacao,
    ProvedorAutenticacao,
    RepositorioUsuario,
} from 'core'
import { UsuarioDTO } from '..'

export default class AutenticacaoFacade {
    constructor(
        private auth: ProvedorAutenticacao,
        private repo: RepositorioUsuario
    ) {}

    async login(provedorId: string): Promise<UsuarioDTO | null> {
        const casoDeUso = new LoginComProvedor(this.auth, this.repo)
        const resultado = await casoDeUso.executar(provedorId)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia?.props as UsuarioDTO
    }

    async logout(): Promise<void> {
        const casoDeUso = new Logout(this.auth)
        const resultado = await casoDeUso.executar()
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async monitorar(observer: (usuario: UsuarioDTO | null) => void): Promise<Function> {
        const casoDeUso = new MonitorarAutenticacao(this.auth, this.repo)
        const resultado = await casoDeUso.executar(observer)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }
}
