import { RecorrenciaProps } from '..'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarRecorrencias implements CasoDeUso<Usuario, RecorrenciaProps[]> {
    constructor(private repo: RepositorioExtrato) {}

    async executar(usuario: Usuario): Promise<Resultado<RecorrenciaProps[]>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        const consultar = await this.repo.consultarRecorrencias(usuario)
        if (consultar.deuErrado) return consultar.comoFalha

        const recorrencias = consultar.instancia
        const props = recorrencias.map((r) => r.props)
        return Resultado.ok(props)
    }
}
