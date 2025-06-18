import { Cartao } from '../../cartao'
import { Categoria } from '../../categoria'
import { Conta } from '../../conta'
import CasoDeUso from '../../shared/base/CasoDeUso'
import FiltroExtrato from '../model/FiltroExtrato'
import Filtros from '../filter'
import Resultado from '../../shared/base/Resultado'

export type In = {
    cartoes: Cartao[]
    categorias: Categoria[]
    contas: Conta[]
}

export default class ConsultarFiltrosExtrato implements CasoDeUso<In, FiltroExtrato[]> {
    constructor() {}

    async executar(entrada: In): Promise<Resultado<FiltroExtrato[]>> {
        const filtros: FiltroExtrato[] = []
        const { cartoes, categorias, contas } = entrada

        const g1 = 'Filtrar Por'
        filtros.push(this.f(g1, 'Avulsas', 11, Filtros.FiltrarAvulsas.id, {}))
        filtros.push(this.f(g1, 'Recorrências', 11, Filtros.FiltrarRecorrencias.id, {}))
        filtros.push(this.f(g1, 'Consolidadas', 12, Filtros.FiltrarConsolidadas.id, {}))
        filtros.push(this.f(g1, 'Não Consolidadas', 12, Filtros.FiltrarNaoConsolidada.id, {}))
        filtros.push(this.f(g1, 'Receitas', 13, Filtros.FiltrarReceitas.id, {}))
        filtros.push(this.f(g1, 'Despesas', 13, Filtros.FiltrarDespesas.id, {}))

        const g2 = 'Filtrar Por (Contas)'
        contas.forEach((c) => {
            const id = `${Filtros.FiltrarPorConta.id}:${c.id}`
            filtros.push(this.f(g2, c.descricao.valor!, 21, id, c.id))
        })

        const g3 = 'Filtrar Por (Cartões)'
        cartoes.forEach((c) => {
            const id = `${Filtros.FiltrarPorCartao.id}:${c.id}`
            filtros.push(this.f(g3, c.descricao.valor!, 31, id, c.id))
        })

        const g4 = 'Agrupar Por'
        filtros.push(this.f(g4, 'Data', 41, Filtros.AgruparPorData.id, {}))
        filtros.push(this.f(g4, 'Cartão', 41, Filtros.AgruparPorCartao.id, cartoes))
        filtros.push(this.f(g4, 'Categoria', 41, Filtros.AgruparPorCategoria.id, categorias))
        filtros.push(this.f(g4, 'Conta', 41, Filtros.AgruparPorConta.id, contas))
        filtros.push(this.f(g4, 'Subcategoria', 41, Filtros.AgruparPorSubcategoria.id, categorias))

        const g5 = 'Consolidar Por'
        filtros.push(this.f(g5, 'Avulsas', 51, Filtros.ConsolidarPorAvulsas.id, {}))
        filtros.push(this.f(g5, 'Cartões', 52, Filtros.ConsolidarPorCartao.id, cartoes))
        filtros.push(this.f(g5, 'Categorias', 53, Filtros.ConsolidarPorCategoria.id, categorias))
        filtros.push(this.f(g5, 'Contas', 54, Filtros.ConsolidarPorConta.id, contas))
        filtros.push(this.f(g5, 'Despesas', 55, Filtros.ConsolidarPorDespesas.id, {}))
        filtros.push(this.f(g5, 'Grupos', 56, Filtros.ConsolidarPorGrupo.id, {}))
        filtros.push(this.f(g5, 'Receitas', 57, Filtros.ConsolidarPorReceitas.id, {}))

        const g6 = 'Ordenar Por'
        filtros.push(this.f(g6, 'Nome', 61, Filtros.OrdenarPorNome.id, {}))
        filtros.push(this.f(g6, 'Valor', 61, Filtros.OrdenarPorValor.id, {}))
        filtros.push(this.f(g6, 'Asc/Des', 62, Filtros.OrdenarNaOrdemInversa.id, {}))

        return Resultado.ok(filtros)
    }

    private f(grupo: string, nome: string, prioridade: number, id: string, params: any) {
        return {
            id,
            nome,
            grupo,
            prioridade,
            params,
        }
    }
}
