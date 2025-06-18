export enum TipoMensagem {
    SUCESSO = 'sucesso',
    ADVERTENCIA = 'advertencia',
    ERRO = 'erro',
}

export default interface Mensagem {
    id?: string
    titulo?: string
    detalhe?: string
    lista?: string[]
    tipo?: TipoMensagem
    duracao?: number
}