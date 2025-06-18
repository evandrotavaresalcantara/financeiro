import { Usuario } from '..'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarPorEmail implements CasoDeUso<string, Usuario | null> {
    constructor(private repo: RepositorioUsuario) {}

    async executar(email: string): Promise<Resultado<Usuario | null>> {
        const consultar = await this.repo.consultarPorEmail(email)
        if (consultar.deuErrado) return consultar.comoFalha

        const usuario = consultar.instancia
        return Resultado.ok(usuario ?? null)
    }
}
