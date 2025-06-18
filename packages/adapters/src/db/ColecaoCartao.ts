import { Id, Cartao, RepositorioCartao, Resultado, Usuario } from 'core'
import { ProvedorDados } from '..'

export default class ColecaoCartao implements RepositorioCartao {
    constructor(private provedor: ProvedorDados) {}

    async salvar(usuario: Usuario, cartao: Cartao): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const docExiste = await this.provedor.existe(this._caminho(usuario), cartao.id.valor)
            const doc: any = { ...cartao.props, updatedAt: new Date(), deleteAt: null }
            if (!docExiste || !doc.createdAt) doc.createdAt = new Date()
            await this.provedor.salvar(this._caminho(usuario), doc)
            return Resultado.ok()
        })
    }

    async salvarTodos(usuario: Usuario, cartoes: Cartao[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await Promise.all(cartoes.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async excluir(usuario: Usuario, cartaoId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await this.provedor.salvarAtribs(this._caminho(usuario), cartaoId.valor, {
                deletedAt: new Date(),
            })
            return Resultado.ok()
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Cartao[]>> {
        return Resultado.tentar(async () => {
            const docs = await this.provedor.buscarTodos(this._caminho(usuario), 'createdAt')
            return Cartao.novos(docs.filter((doc) => !doc.deletedAt))
        })
    }

    private _caminho(usuario: Usuario): string {
        return `cartoes/${usuario.email.valor}/itens`
    }
}
