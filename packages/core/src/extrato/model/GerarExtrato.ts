import Extrato from './Extrato'
import Recorrencia from './Recorrencia'
import Resultado from '../../shared/base/Resultado'
import Transacao from './Transacao'

export default class GerarExtrato {
    static com(data: Date, recorrencias: Recorrencia[]): Resultado<Extrato> {
        const mes = data.getMonth() + 1
        const ano = data.getFullYear()

        const transacoes = recorrencias
            .map((r) => r.gerarParcela(ano, mes).instancia)
            .filter((t) => t) as Transacao[]

        const gerarExtrato = Extrato.novo({
            data: new Date(`${ano}/${mes}/01 12:00:00`),
            transacoes: transacoes.map((t) => t.props),
        })

        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha
        return Resultado.ok(gerarExtrato.instancia)
    }
}
