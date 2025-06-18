import { UsuarioDTO } from '../dto'
import { RepositorioUsuario, ConsultarPorEmail, SalvarUsuario, Usuario } from 'core'

export default class UsuarioFacade {
    constructor(readonly repo: RepositorioUsuario) {}

    async salvar(usuario: UsuarioDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new SalvarUsuario(this.repo)
        const resultado = await casoDeUso.executar(criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(email: string): Promise<UsuarioDTO | null> {
        const casoDeUso = new ConsultarPorEmail(this.repo)
        const resultado = await casoDeUso.executar(email)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia?.props as UsuarioDTO
    }
}
