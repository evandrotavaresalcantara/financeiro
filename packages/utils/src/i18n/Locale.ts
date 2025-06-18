import Erro from "../error/Erro"

export default interface Locale {
    lingua: string
    moeda: string
    erros: Erro[]
}