export default interface Erro {
    tipo: string
    cls?: string
    atr?: string
    valor?: any
    detalhes?: any
    msg?: (e?: Erro) => string
}
