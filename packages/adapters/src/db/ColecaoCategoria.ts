import { Id, Categoria, RepositorioCategoria, Resultado, Usuario } from 'core'
import { fn } from 'utils'
import { ProvedorDados } from '..'

export default class ColecaoCategoria implements RepositorioCategoria {
    constructor(private provedor: ProvedorDados) {}

    async salvar(usuario: Usuario, categoria: Categoria): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const docExiste = await this.provedor.existe(this._caminho(usuario), categoria.id.valor)
            const doc: any = {
                ...fn.obj.manterAtribs(categoria.props, ['id', 'nome', 'idPai']),
                updatedAt: new Date(),
                deleteAt: null,
            }
            if (!docExiste || !doc.createdAt) doc.createdAt = new Date()
            await this.provedor.salvar(this._caminho(usuario), doc)
            return Resultado.ok()
        })
    }

    async salvarTodas(usuario: Usuario, categorias: Categoria[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await Promise.all(categorias.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async excluir(usuario: Usuario, categoriaId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await this.provedor.salvarAtribs(this._caminho(usuario), categoriaId.valor, {
                deletedAt: new Date(),
            })
            return Resultado.ok()
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Categoria[]>> {
        return Resultado.tentar(async () => {
            const docs = await this.provedor.buscarTodos(this._caminho(usuario), 'nome')
            return Categoria.novas(docs.filter((doc) => !doc.deletedAt))
        })
    }

    private _caminho(usuario: Usuario): string {
        return `categorias/${usuario.email.valor}/itens`
    }
}
