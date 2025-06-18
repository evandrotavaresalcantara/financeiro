import { AnoMesId } from '../../shared'
import { Extrato, Transacao } from '../../extrato'
import { fn } from 'utils'
import { Saldo } from '..'
import { TipoOperacao } from '../../extrato'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Conta from '../model/Conta'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class AtualizarSaldos implements CasoDeUso<Extrato[], void> {
    constructor(private repo: RepositorioConta) {}

    async executar(extratos: Extrato[], usuario: Usuario): Promise<Resultado<void>> {
        const consultarContas = await this.repo.consultar(usuario)
        const contas = consultarContas.instancia
        if (consultarContas.deuErrado) return consultarContas.comoFalha

        const contasAtualizadas = contas.map((conta) => this.atualizarSaldos(conta, extratos))
        return this.repo.salvarTodas(usuario, contasAtualizadas)
    }

    private atualizarSaldos(conta: Conta, extratos: Extrato[]): Conta {
        const datas = [...extratos.map((e) => e.data), ...conta.saldos.map((s) => s.data)].map(
            (d) => new Date(d)
        )

        const min = fn.dt.primeiroDiaDoMes(fn.dt.min(...datas)!)
        const max = fn.dt.ultimoDiaDoMes(fn.dt.max(...datas)!)

        const saldos: Saldo[] = fn.dt.mesesEntre(min, max).map((data) => {
            const id = AnoMesId.novo(data).instancia.valor
            const extratoDoMes = extratos.find((e) => e.id.valor === id)
            const saldoDoMes = conta.saldo(data)
            if (!extratoDoMes) return saldoDoMes

            const trsDasContas = extratoDoMes.transacoes.filter((t) => t.contaId === conta.id.valor)
            const creditos = trsDasContas.reduce(this.somarValor(TipoOperacao.RECEITA), 0)
            const debitos = trsDasContas.reduce(this.somarValor(TipoOperacao.DESPESA), 0)
            
            return Saldo.novo({ id, data, creditos, debitos, acumulado: 0 }).instancia
        })

        return Conta.nova({ ...conta.props, saldos: saldos.map((s) => s.props) }).instancia
    }

    private somarValor(tipo: TipoOperacao) {
        return (valor: number, tr: Transacao): number => {
            return tipo === tr.operacao ? Math.abs(valor) + Math.abs(tr.valor) : valor
        }
    }
}
