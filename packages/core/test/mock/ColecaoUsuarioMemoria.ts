import { RepositorioUsuario } from '../../src'
import Dados from '../data/bases/Dados'
import Resultado from '../../src/shared/base/Resultado'
import Usuario from '../../src/usuario/model/Usuario'

export default class ColecaoUsuarioMemoria implements RepositorioUsuario {
    private usuarios: Resultado<Usuario>[] = [
        Usuario.novo({
            id: Dados.id.aleatorio(),
            nome: Dados.nome.usuario(),
            email: Dados.email.especifico(),
            config: {
                esconderSumarios: false,
                esconderValores: false,
                menuMini: false,
                exibirFiltros: false,
                filtros: [Dados.texto.geradorCaracteres(3), Dados.texto.geradorCaracteres(3)],
            },
        }),
        Usuario.novo({
            id: Dados.id.aleatorio(),
            nome: Dados.nome.usuario(),
            email: Dados.email.especifico(0),
            config: {
                esconderSumarios: false,
                esconderValores: false,
                menuMini: false,
                exibirFiltros: false,
                filtros: [Dados.texto.geradorCaracteres(3), Dados.texto.geradorCaracteres(3)],
            },
        }),
    ]

    constructor(readonly simularErro: boolean = false) {}

    async salvar(usuario: Usuario): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            this.usuarios.push(Usuario.novo(usuario.props))

            return Resultado.ok()
        })
    }
    
    async consultarPorEmail(email: string): Promise<Resultado<Usuario | null>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuario = this.usuarios.find((u) => u.instancia?.email.valor === email)?.instancia
                ?.props

            return usuario ? Usuario.novo(usuario) : Resultado.nulo()
        })
    }
}
