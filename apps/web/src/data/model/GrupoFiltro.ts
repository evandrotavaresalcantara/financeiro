import { FiltroExtratoDTO } from 'adapters'

export default interface GrupoFiltro {
    nome: string
    icone: any
    filtros: FiltroExtratoDTO[]
}
