import { Usuario } from '../../src'
import Categoria from '../../src/categoria/model/Categoria'
import Id from '../../src/shared/types/Id'
import RepositorioCategoria from '../../src/categoria/provider/RepositorioCategoria'
import Resultado from '../../src/shared/base/Resultado'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoCategoriaMemoriaProps {
    categorias: Categoria[]
    usuario: Usuario
}

export default class ColecaoCategoriaMemoria implements RepositorioCategoria {
    private dados: ColecaoCategoriaMemoriaProps[] = []

    constructor(readonly simularErro: boolean = false) {}

    async salvar(usuario: Usuario, categoria: Categoria): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.email.valor === usuario.email.valor)
            if (usuarioEncontrado) {
                const cartaoEncontrado = usuarioEncontrado.categorias.find(
                    (c) => c.id.valor === categoria.id.valor
                )
                if (cartaoEncontrado) {
                    usuarioEncontrado.categorias = usuarioEncontrado.categorias.map((c) => {
                        if (c.id.valor === categoria.id.valor) {
                            c = categoria
                        }
                        return c
                    })
                } else {
                    usuarioEncontrado.categorias.push(categoria)
                }
            } else {
                this.dados.push({ usuario, categorias: [categoria] })
            }
            return Resultado.ok()
        })
    }

    async salvarTodas(usuario: Usuario, categorias: Categoria[]): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            await Promise.all(categorias.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async excluir(usuario: Usuario, categoriaId: Id): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.email.valor === usuario.email.valor)
            if (usuarioEncontrado) {
                usuarioEncontrado.categorias = usuarioEncontrado.categorias.filter(
                    (c) => c.id.valor !== categoriaId.valor
                )
            }
            return Resultado.ok()
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Categoria[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.email.valor === usuario.email.valor)
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.categorias)
            }
            return Resultado.ok([])
        })
    }
}
