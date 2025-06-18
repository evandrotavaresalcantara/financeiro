import { Usuario, RepositorioUsuario, Resultado } from 'core'
import { ProvedorDados } from '..'

export default class ColecaoUsuario implements RepositorioUsuario {
    constructor(private provedor: ProvedorDados) {}

    async salvar(usuario: Usuario): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const docExiste = await this.provedor.existe('usuarios', usuario.email.valor)
            const doc: any = { ...usuario.props, updatedAt: new Date(), deleteAt: null }
            if (!docExiste || !doc.createdAt) doc.createdAt = new Date()
            await this.provedor.salvar('usuarios', doc, doc.email)
            return Resultado.ok()
        })
    }

    async consultarPorEmail(email: string): Promise<Resultado<Usuario | null>> {
        return Resultado.tentar(async () => {
            const doc = await this.provedor.buscarPorId('usuarios', email)
            return doc ? Usuario.novo(doc) : Resultado.nulo()
        })
    }
}
