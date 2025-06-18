import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Conta from '../model/Conta'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class SalvarConta implements CasoDeUso<Conta, void> {
    constructor(private repo: RepositorioConta) {}

    async executar(conta: Conta, usuario: Usuario): Promise<Resultado<void>> {
        return this.repo.salvar(usuario, conta)
    }
}
