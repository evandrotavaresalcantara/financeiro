import Resultado from "../../shared/base/Resultado"
import Usuario from "../model/Usuario"

export default interface RepositorioUsuario {
    salvar(usuario: Usuario): Promise<Resultado<void>>
    consultarPorEmail(email: string): Promise<Resultado<Usuario | null>>
}