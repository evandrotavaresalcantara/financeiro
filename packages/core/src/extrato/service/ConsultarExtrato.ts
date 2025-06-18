import { Extrato } from '..'
import { Usuario } from '../../usuario'
import AnoMesId from '../../shared/types/AnoMesId'
import CasoDeUso from '../../shared/base/CasoDeUso'
import GerarExtrato from '../model/GerarExtrato'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarExtrato implements CasoDeUso<Date, Extrato> {
    constructor(private repo: RepositorioExtrato) {}

    async executar(data: Date, usuario: Usuario): Promise<Resultado<Extrato>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        
        const gerarId = AnoMesId.novo(data)
        if (gerarId.deuErrado) return gerarId.comoFalha

        const consultar = await this.repo.consultarPorId(usuario, gerarId.instancia)
        if (consultar.deuErrado) return consultar.comoFalha

        const extrato = consultar.instancia
        if (extrato) return Resultado.ok(extrato)

        const gerarExtrato = await this.gerar(usuario, data)
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha
        return Resultado.ok(gerarExtrato.instancia)
    }

    private async gerar(usuario: Usuario, data: Date): Promise<Resultado<Extrato>> {
        const consultarRecs = await this.repo.consultarRecorrenciasPorMes(usuario, data)
        if (consultarRecs.deuErrado) return consultarRecs.comoFalha
        return GerarExtrato.com(data, consultarRecs.instancia)
    }
}
