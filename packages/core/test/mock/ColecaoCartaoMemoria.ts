import { Usuario } from '../../src'
import Cartao from '../../src/cartao/model/Cartao'
import CartaoBuilder from '../data/CartaoBuilder'
import Id from '../../src/shared/types/Id'
import RepositorioCartao from '../../src/cartao/provider/RepositorioCartao'
import Resultado from '../../src/shared/base/Resultado'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoCartaoMemoriaProps {
    cartoes: Cartao[]
    usuario: Usuario
}

export default class ColecaoCartaoMemoria implements RepositorioCartao {
    private dados: ColecaoCartaoMemoriaProps[] = []

    constructor(readonly simularErro: boolean = false) {}

    async salvar(usuario: Usuario, cartao: Cartao): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                const cartaoEncontrado = usuarioEncontrado.cartoes.find(
                    (c) => c.id.valor === cartao.id.valor
                )
                if (cartaoEncontrado) {
                    usuarioEncontrado.cartoes = usuarioEncontrado.cartoes.map((c) => {
                        return c.id.valor === cartao.id.valor ? cartao : c
                    })
                } else {
                    usuarioEncontrado.cartoes.push(cartao)
                }
            } else {
                this.dados.push({ usuario, cartoes: [cartao] })
            }
            return Resultado.ok()
        })
    }

    async salvarTodos(usuario: Usuario, cartoes: Cartao[]): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            await Promise.all(cartoes.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Cartao[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.cartoes)
            }
            return Resultado.ok([])
        })
    }

    async excluir(usuario: Usuario, cartaoId: Id): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                usuarioEncontrado.cartoes = usuarioEncontrado.cartoes.filter(
                    (c) => c.id.valor !== cartaoId.valor
                )
            }
            return Resultado.ok()
        })
    }
}
