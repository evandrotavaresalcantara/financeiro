import { Usuario } from '../../src'
import Conta from '../../src/conta/model/Conta'
import Id from '../../src/shared/types/Id'
import RepositorioConta from '../../src/conta/provider/RepositorioConta'
import Resultado from '../../src/shared/base/Resultado'

interface ColecaoContaMemoriaProps {
    contas: Conta[]
    usuario: Usuario
}

export default class ColecaoContaMemoria implements RepositorioConta {
    private dados: ColecaoContaMemoriaProps[] = []

    constructor(readonly simularErro: boolean = false) {}

    async salvar(usuario: Usuario, conta: Conta): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                const contaEncontrada = usuarioEncontrado.contas.find(
                    (c) => c.id.valor === conta.id.valor
                )
                if (contaEncontrada) {
                    usuarioEncontrado.contas = usuarioEncontrado.contas.map((c) => {
                        return c.id.valor === conta.id.valor ? conta : c
                    })
                } else {
                    usuarioEncontrado.contas.push(conta)
                }
            } else {
                this.dados.push({ usuario, contas: [conta] })
            }
            return Resultado.ok()
        })
    }

    async salvarTodas(usuario: Usuario, contas: Conta[]): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            await Promise.all(contas.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async excluir(usuario: Usuario, contaId: Id): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                usuarioEncontrado.contas = usuarioEncontrado.contas.filter(
                    (c) => c.id.valor !== contaId.valor
                )
            }
            return Resultado.ok()
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Conta[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.contas)
            }
            return Resultado.ok([])
        })
    }
}
