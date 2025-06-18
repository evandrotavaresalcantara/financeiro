import DadosNome from "./DadosNome"
import DadosTelefone from "./DadosTelefone"
import DadosCpf from "./DadosCpf"
import DadosUrl from "./DadosUrl"
import DadosId from "./DadosId"
import DadosEmail from "./DadosEmail"
import DadosBooleano from "./DadosBooleano"
import DadosTexto from "./DadosTexto"
import DadosNumero from "./DadosNumero"
import DadosData from "./DadosData"

export default class Dados {
    static booleano = DadosBooleano
    static texto = DadosTexto
    static numero = DadosNumero
    static data = DadosData
    static id = DadosId
    static email = DadosEmail
    static nome = DadosNome
    static cpf = DadosCpf
    static telefone = DadosTelefone
    static url = DadosUrl
}
