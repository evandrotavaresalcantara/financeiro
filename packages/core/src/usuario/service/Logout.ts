import { ProvedorAutenticacao } from '../../shared'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Resultado from '../../shared/base/Resultado'

export default class Logout implements CasoDeUso<void, void> {
    constructor(private auth: ProvedorAutenticacao) {}

    async executar(): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await this.auth.logout()
            return Resultado.ok()
        })
    }
}
