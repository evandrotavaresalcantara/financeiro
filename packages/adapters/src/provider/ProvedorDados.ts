export type DirecaoOrdenacao = 'desc' | 'asc'
export type FiltroOperacao =
    | '<'
    | '<='
    | '=='
    | '!='
    | '>='
    | '>'
    | 'array-contains'
    | 'in'
    | 'array-contains-any'
    | 'not-in'

export interface Filtro {
    attribute: string
    op: FiltroOperacao
    value: any
}

export interface Pagina {
    dados: any[]
    proximo: () => Promise<Pagina>
}

export interface ComandoBatch {
    caminho: string
    entidade: any
    id?: string
    tipo: 'salvar' | 'excluir'
}

export default interface ProvedorDados {
    salvar(caminho: string, entidade: any, id?: string): Promise<any>
    salvarTodos(caminhos: string[], entidades: any[]): Promise<void>
    salvarAtribs(caminho: string, id: string, atributos: any): Promise<void>

    existe(caminho: string, id: string): Promise<boolean>

    buscarTodos(caminho: string, ordenarPor?: string, direction?: DirecaoOrdenacao): Promise<any[]>
    buscarPagina(
        caminho: string,
        ordenarPor: string,
        direction: DirecaoOrdenacao,
        qty?: number,
        last?: any
    ): Promise<Pagina>
    buscarPor(
        caminho: string,
        filtros: Filtro[],
        ordenarPor?: string,
        direction?: DirecaoOrdenacao
    ): Promise<any[]>
    buscarPorId(caminho: string, id: string): Promise<any>
    buscarPorIds(caminho: string, ids: string[]): Promise<any[]>

    excluir(caminho: string, id: string): Promise<boolean>
    excluirTodos(caminho: string, ids: string[]): Promise<void>

    executarTodos(comandos: ComandoBatch[]): Promise<void>
}
