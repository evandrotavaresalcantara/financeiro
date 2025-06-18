import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Categoria from '../model/Categoria'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class SalvarCategorias implements CasoDeUso<Categoria[], void> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(categorias: Categoria[], usuario: Usuario): Promise<Resultado<void>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        if (!categorias) return Resultado.falha('CATEGORIAS_NULAS')

        const invalida = categorias.some(c => !c)
        if (invalida) return Resultado.falha('CATEGORIA_INVALIDA')

        return this.repo.salvarTodas(usuario, categorias)
    }
}
