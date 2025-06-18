import { Extrato, Transacao } from '..'
import { FiltroTransacao, filtros as todosOsFiltros } from '../filter'
import CasoDeUso from '../../shared/base/CasoDeUso'
import FiltroExtrato from '../model/FiltroExtrato'
import Resultado from '../../shared/base/Resultado'

export type In = {
    extrato: Extrato
    filtros: FiltroExtrato[]
}

export default class FiltrarExtrato implements CasoDeUso<In, Extrato> {
    async executar(dados: In): Promise<Resultado<Extrato>> {
        const transacoes = dados.extrato.transacoes
        const filtradas = dados.filtros.reduce(this.aplicarFiltros, transacoes)

        const gerarExtrato = Extrato.novo({
            data: dados.extrato.data,
            transacoes: filtradas.map((t) => t.props),
        })
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha
        return Resultado.ok(gerarExtrato.instancia)
    }

    private aplicarFiltros(transacoes: Transacao[], filtro: FiltroExtrato): Transacao[] {
        const idFiltro = filtro.id.split(':')[0]
        if (!idFiltro) return transacoes

        const filtroSelecionado = (todosOsFiltros as any)[idFiltro] as FiltroTransacao
        if (!filtroSelecionado) return transacoes

        return filtroSelecionado.aplicar(filtro.params)(transacoes)
    }
}
