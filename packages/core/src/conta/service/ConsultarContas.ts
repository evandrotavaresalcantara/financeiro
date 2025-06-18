import { Conta } from '..'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarContas implements CasoDeUso<Usuario, Conta[]> {
    constructor(private repo: RepositorioConta) {}

    async executar(usuario: Usuario): Promise<Resultado<Conta[]>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        const consultar = await this.repo.consultar(usuario)
        if (consultar.deuErrado) return consultar.comoFalha

        const contas = consultar.instancia
        return Resultado.ok(contas)
    }
}
