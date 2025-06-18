import { Extrato, Transacao } from '..'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Resultado from '../../shared/base/Resultado'

export type In = {
    extratos: Extrato[]
    recorrenciaId: string
}

export default class RelatorioEvolucaoRecorrencia implements CasoDeUso<In, Transacao[]> {
    async executar(entrada: In): Promise<Resultado<Transacao[]>> {
        const evolucoes = entrada.extratos
            .reduce((evolucoes, extrato) => {
                const { transacoes } = extrato
                const parcela = transacoes.find((t) => t.recorrenciaId === entrada.recorrenciaId)
                return parcela ? [...evolucoes, parcela] : evolucoes
            }, [] as Transacao[])
            .sort(Transacao.sort)

        return Resultado.ok(evolucoes)
    }
}
