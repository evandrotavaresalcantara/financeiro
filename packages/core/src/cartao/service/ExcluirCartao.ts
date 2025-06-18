import { Cartao } from '..'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Id from '../../shared/types/Id'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class ExcluirCartao implements CasoDeUso<Cartao, void> {
    constructor(private repo: RepositorioCartao) {}

    async executar(cartao: Cartao, usuario: Usuario): Promise<Resultado<void>> {
        const criarId = Id.novo(cartao?.id.valor)
        if (criarId.deuErrado) return criarId.comoFalha
        return this.repo.excluir(usuario, criarId.instancia)
    }
}
