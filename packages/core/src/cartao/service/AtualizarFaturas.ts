import { AnoMesId } from '../../shared'
import { Extrato, TipoOperacao, Transacao } from '../../extrato'
import { Fatura } from '..'
import { fn } from 'utils'
import { Usuario } from '../..'
import Cartao from '../model/Cartao'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class AtualizarFaturas implements CasoDeUso<Extrato[], void> {
    constructor(private repo: RepositorioCartao) {}

    async executar(extratos: Extrato[], usuario: Usuario): Promise<Resultado<void>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        if (!extratos) return Resultado.falha('EXTRATOS_NULOS')
        
        const consultarCartoes = await this.repo.consultar(usuario)
        const cartoes = consultarCartoes.instancia
        if (consultarCartoes.deuErrado) return consultarCartoes.comoFalha

        const cartoesAtualizadas = cartoes.map((cartao) => this.atualizarFaturas(cartao, extratos))
        return this.repo.salvarTodos(usuario, cartoesAtualizadas)
    }

    private atualizarFaturas(cartao: Cartao, extratos: Extrato[]): Cartao {
        const datas = [...extratos.map((e) => e.data), ...cartao.faturas.map((c) => c.data)].map(
            (d) => new Date(d)
        )

        const min = fn.dt.primeiroDiaDoMes(fn.dt.min(...datas)!)
        const max = fn.dt.ultimoDiaDoMes(fn.dt.max(...datas)!)

        const faturas: Fatura[] = fn.dt.mesesEntre(min, max).map((data) => {
            const id = AnoMesId.novo(data).instancia.valor
            const extratoDoMes = extratos.find((e) => e.id.valor === id)
            const faturaDoMes = cartao.fatura(data)
            if (!extratoDoMes) return faturaDoMes

            const valor = extratoDoMes.transacoes
                .filter((t) => t.cartaoId === cartao.id.valor)
                .reduce(this.somarValor, 0)

            return Fatura.nova({
                id,
                data,
                valor,
                valorPlanejado: faturaDoMes.valorPlanejado,
            }).instancia
        })

        return Cartao.novo({ ...cartao.props, faturas: faturas.map((f) => f.props) }).instancia
    }

    private somarValor(valor: number, tr: Transacao): number {
        return tr.operacao === TipoOperacao.RECEITA ? valor + tr.valor : valor - tr.valor
    }
}
