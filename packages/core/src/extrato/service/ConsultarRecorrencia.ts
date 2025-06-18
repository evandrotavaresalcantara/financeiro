import { RecorrenciaProps } from '..'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarRecorrencia implements CasoDeUso<string, RecorrenciaProps | null> {
    constructor(private repo: RepositorioExtrato) {}

    async executar(id: string, usuario: Usuario): Promise<Resultado<RecorrenciaProps | null>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        const consultar = await this.repo.consultarRecorrenciaPorId(usuario, id)
        if (consultar.deuErrado) return consultar.comoFalha
        const props = consultar.instancia?.props
        return props ? Resultado.ok(props) : Resultado.nulo()
    }
}
