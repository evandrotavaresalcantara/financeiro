import { CartaoDTO, CategoriaDTO, ContaDTO } from 'adapters'
import {
    IconArrowsDoubleSwNe,
    IconBuildingBank,
    IconCreditCard,
    IconFilter,
    IconFolders,
    IconStack2,
} from '@tabler/icons-react'
import GrupoFiltro from '../model/GrupoFiltro'
import { core } from '../../adapters'

const icones = [
    { nome: 'Filtrar Por', icone: <IconFilter /> },
    { nome: 'Filtrar Por (Contas)', icone: <IconBuildingBank /> },
    { nome: 'Filtrar Por (Cartões)', icone: <IconCreditCard /> },
    { nome: 'Agrupar Por', icone: <IconFolders /> },
    { nome: 'Consolidar Por', icone: <IconStack2 /> },
    { nome: 'Ordenar Por', icone: <IconArrowsDoubleSwNe /> },
]

export function obterIcone(nome: string) {
    return icones.find((i) => i.nome === nome)?.icone
}

const gerarFiltros = async (
    contas: ContaDTO[],
    cartoes: CartaoDTO[],
    categorias: CategoriaDTO[]
) => {
    const filtros = await core.extrato.consultarFiltrosExtrato(cartoes, categorias, contas)
    return filtros.reduce((grupos, filtro) => {
        const grupo = grupos.find((g: any) => g.nome === filtro.grupo)
        if (grupo) {
            grupo.filtros.push(filtro)
        } else {
            grupos.push({
                nome: filtro.grupo,
                icone: icones.find((i) => i.nome === filtro.grupo)?.icone,
                filtros: [filtro],
            })
        }
        return grupos
    }, [] as GrupoFiltro[])
}

export default gerarFiltros

// ;[
//     {
//         nome: 'Filtrar Por',
//         icone: <IconFilter />,
//         filtros: [
//             { nome: 'Avulsas', prioridade: 10, ...Filtros.FiltrarAvulsas },
//             { nome: 'Recorrências', prioridade: 10, ...Filtros.FiltrarRecorrencias },
//             { nome: 'Consolidadas', prioridade: 20, ...Filtros.FiltrarConsolidadas },
//             { nome: 'Não Consolidadas', prioridade: 20, ...Filtros.FiltrarNaoConsolidada },
//             { nome: 'Receitas', prioridade: 30, ...Filtros.FiltrarReceitas },
//             { nome: 'Despesas', prioridade: 30, ...Filtros.FiltrarDespesas },
//         ],
//     },
//     {
//         nome: 'Filtrar Por (Contas)',
//         icone: <IconBuildingBank />,
//         filtros: [
//             ...contas.map((conta) => ({
//                 nome: conta.descricao,
//                 prioridade: 40,
//                 ...Filtros.FiltrarPorConta(conta.id!),
//             })),
//         ],
//     },
//     {
//         nome: 'Filtrar Por (Cartões)',
//         icone: <IconCreditCard />,
//         filtros: [
//             ...cartoes.map((cartao) => ({
//                 nome: cartao.descricao,
//                 prioridade: 50,
//                 ...Filtros.FiltrarPorCartao(cartao.id!),
//             })),
//         ],
//     },
//     {
//         nome: 'Agrupar Por',
//         icone: <IconFolders />,
//         filtros: [
//             { nome: 'Data', prioridade: 60, ...Filtros.AgruparPorData },
//             { nome: 'Cartão', prioridade: 60, ...Filtros.AgruparPorCartao(cartoes) },
//             { nome: 'Categoria', prioridade: 60, ...Filtros.AgruparPorCategoria(categorias) },
//             { nome: 'Conta', prioridade: 60, ...Filtros.AgruparPorConta(contas) },
//             { nome: 'Subcategoria', prioridade: 60, ...Filtros.AgruparPorSubcategoria(categorias) },
//         ],
//     },
//     {
//         nome: 'Consolidar Por',
//         icone: <IconStack2 />,
//         filtros: [
//             { nome: 'Avulsas', prioridade: 110, ...Filtros.ConsolidarPorAvulsas },
//             { nome: 'Cartões', prioridade: 120, ...Filtros.ConsolidarPorCartao(cartoes) },
//             { nome: 'Categorias', prioridade: 130, ...Filtros.ConsolidarPorCategoria(categorias) },
//             { nome: 'Contas', prioridade: 140, ...Filtros.ConsolidarPorConta(contas) },
//             { nome: 'Despesas', prioridade: 150, ...Filtros.ConsolidarPorDespesas },
//             { nome: 'Grupos', prioridade: 160, ...Filtros.ConsolidarPorGrupo },
//             { nome: 'Receitas', prioridade: 170, ...Filtros.ConsolidarPorReceitas },
//         ],
//     },
//     {
//         nome: 'Ordenar Por',
//         icone: <IconArrowsDoubleSwNe />,
//         filtros: [
//             { nome: 'Nome', prioridade: 200, ...Filtros.OrdenarPorNome },
//             { nome: 'Valor', prioridade: 200, ...Filtros.OrdenarPorValor },
//             { nome: 'Asc/Des', prioridade: 210, ...Filtros.OrdenarNaOrdemInversa },
//         ],
//     },
// ] as GrupoFiltro[]
