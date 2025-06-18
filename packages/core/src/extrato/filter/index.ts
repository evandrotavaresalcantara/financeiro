import AgruparPorCartao from './AgruparPorCartao'
import AgruparPorCategoria from './AgruparPorCategoria'
import AgruparPorConta from './AgruparPorConta'
import AgruparPorData from './AgruparPorData'
import AgruparPorSubcategoria from './AgruparPorSubcategoria'
import ConsolidarPorAvulsas from './ConsolidarPorAvulsas'
import ConsolidarPorCartao from './ConsolidarPorCartao'
import ConsolidarPorCategoria from './ConsolidarPorCategoria'
import ConsolidarPorConta from './ConsolidarPorConta'
import ConsolidarPorDespesas from './ConsolidarPorDespesas'
import ConsolidarPorGrupo from './ConsolidarPorGrupo'
import ConsolidarPorReceitas from './ConsolidarPorReceitas'
import FiltrarAvulsas from './FiltrarAvulsas'
import FiltrarConsolidadas from './FiltrarConsolidadas'
import FiltrarDespesas from './FiltrarDespesas'
import FiltrarNaoConsolidada from './FiltrarNaoConsolidada'
import FiltrarPorCartao from './FiltrarPorCartao'
import FiltrarPorConta from './FiltrarPorConta'
import FiltrarReceitas from './FiltrarReceitas'
import FiltrarRecorrencias from './FiltrarRecorrencias'
import FiltroTransacao from './FiltroTransacao'
import OrdenarNaOrdemInversa from './OrdenarNaOrdemInversa'
import OrdenarPorNome from './OrdenarPorNome'
import OrdenarPorValor from './OrdenarPorValor'
import RemoverDuplicadas from './RemoverDuplicadas'

export type { FiltroTransacao }

const filtros = {
    AgruparPorCartao,
    AgruparPorCategoria,
    AgruparPorConta,
    AgruparPorData,
    AgruparPorSubcategoria,
    ConsolidarPorAvulsas,
    ConsolidarPorCartao,
    ConsolidarPorCategoria,
    ConsolidarPorConta,
    ConsolidarPorDespesas,
    ConsolidarPorGrupo,
    ConsolidarPorReceitas,
    FiltrarAvulsas,
    FiltrarConsolidadas,
    FiltrarDespesas,
    FiltrarNaoConsolidada,
    FiltrarPorCartao,
    FiltrarPorConta,
    FiltrarReceitas,
    FiltrarRecorrencias,
    OrdenarNaOrdemInversa,
    OrdenarPorNome,
    OrdenarPorValor,
    RemoverDuplicadas,
} as const

export { filtros }
export default filtros
