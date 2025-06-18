import { ProvedorAutenticacao } from '../../shared'
import { UsuarioProps } from '..'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'

type In = (usuario: UsuarioProps | null) => void

export default class MonitorarAutenticacao implements CasoDeUso<In, Function> {
    constructor(
        private auth: ProvedorAutenticacao,
        private repo: RepositorioUsuario
    ) {}

    async executar(observer: In): Promise<Resultado<Function>> {
        return Resultado.tentar(async () => {
            const funcaoCancelar = this.auth.monitorar((usuarioAuth) => {
                if (!usuarioAuth) return observer(null)
                this.repo.consultarPorEmail(usuarioAuth.email.valor ?? '').then((resultado) => {
                    if (resultado.deuErrado) return observer(null)

                    const usuario = resultado.instancia
                    if (!usuario) return observer(null)

                    observer(usuario.props)
                })
            })
            return Resultado.ok(funcaoCancelar)
        })
    }
}
