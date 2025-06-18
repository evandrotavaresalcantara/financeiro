import { TipoVisualizacao } from '../../shared/types/TipoVisualizacao'
import Props from '../../shared/base/Props'
import Resultado from '../../shared/base/Resultado'

export interface UsuarioConfigProps extends Props {
    esconderSumarios?: boolean
    esconderValores?: boolean
    menuMini?: boolean
    visualizacao?: TipoVisualizacao
    exibirFiltros?: boolean
    filtros?: string[]
}

export default class UsuarioConfig {
    constructor(
        readonly esconderSumarios: boolean,
        readonly esconderValores: boolean,
        readonly menuMini: boolean,
        readonly visualizacao: TipoVisualizacao,
        readonly exibirFiltros: boolean,
        readonly filtros: string[],
        readonly props: UsuarioConfigProps
    ) {}

    static vazio(): UsuarioConfig {
        return UsuarioConfig.novo({}).instancia
    }

    static novo(props: Partial<UsuarioConfigProps>): Resultado<UsuarioConfig> {
        const propsCompleto: Required<UsuarioConfigProps> = {
            esconderSumarios: props?.esconderSumarios ?? false,
            esconderValores: props?.esconderValores ?? false,
            menuMini: props?.menuMini ?? false,
            visualizacao: props?.visualizacao ?? TipoVisualizacao.LISTA,
            exibirFiltros: props?.exibirFiltros ?? false,
            filtros: props?.filtros ?? [],
        }

        return Resultado.ok(
            new UsuarioConfig(
                propsCompleto.esconderSumarios,
                propsCompleto.esconderValores,
                propsCompleto.menuMini,
                propsCompleto.visualizacao,
                propsCompleto.exibirFiltros,
                propsCompleto.filtros,
                propsCompleto
            )
        )
    }
}
