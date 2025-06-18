import { Extrato } from '..'
import { Usuario } from '../../usuario'
import AnoMesId from '../../shared/types/AnoMesId'
import CasoDeUso from '../../shared/base/CasoDeUso'
import GerarExtrato from '../model/GerarExtrato'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarExtratos implements CasoDeUso<Date[], Extrato[]> {
    constructor(private repo: RepositorioExtrato) {}

    async executar(datas: Date[], usuario: Usuario): Promise<Resultado<Extrato[]>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        const gerarIds = Resultado.combinar(datas.map((dt) => AnoMesId.novo(dt)))
        if (gerarIds.deuErrado) return gerarIds.comoFalha

        const ids = gerarIds.instancia
        const consultar = await this.repo.consultarPorIds(usuario, ids)
        if (consultar.deuErrado) return consultar.comoFalha

        const extratosDoBanco = consultar.instancia

        const gerarExtratos = await Resultado.combinarAsync(
            datas.map(async (data) => {
                const id = AnoMesId.novo(data).instancia
                const extrato = extratosDoBanco.find((e) => e.id.valor === id.valor)
                if (extrato) return Resultado.ok(extrato)
                return this.gerar(usuario, data)
            })
        )

        if (gerarExtratos.deuErrado) return gerarExtratos.comoFalha
        return gerarExtratos
    }

    private async gerar(usuario: Usuario, data: Date): Promise<Resultado<Extrato>> {
        const consultarRecs = await this.repo.consultarRecorrenciasPorMes(usuario, data)
        if (consultarRecs.deuErrado) return consultarRecs.comoFalha
        return GerarExtrato.com(data, consultarRecs.instancia)
    }
}
