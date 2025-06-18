import { Usuario } from '../../usuario'
import Cartao from '../model/Cartao'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class SalvarCartao implements CasoDeUso<Cartao, void> {
    constructor(private repo: RepositorioCartao) {}

    async executar(cartao: Cartao, usuario: Usuario): Promise<Resultado<void>> {
        return this.repo.salvar(usuario, cartao)
    }
}
