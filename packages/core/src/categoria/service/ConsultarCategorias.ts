import { CategoriaProps, Usuario } from '../..'
import { fn } from 'utils'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RelacionarCategorias from '../model/RelacionarCategorias'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarCategorias implements CasoDeUso<Usuario, CategoriaProps[]> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(usuario: Usuario): Promise<Resultado<CategoriaProps[]>> {
        const consultar = await this.repo.consultar(usuario)
        if (consultar.deuErrado) return consultar.comoFalha

        const categoriasBrutas = consultar.instancia
        const relacionarCat = new RelacionarCategorias(categoriasBrutas).executar()
        if (relacionarCat.deuErrado) return relacionarCat.comoFalha

        const categorias = relacionarCat.instancia.sort((c1, c2) =>
            fn.str.ordenar(c1.nome.valor, c2.nome.valor)
        )

        const props = categorias.map((cartao) => cartao.props)
        return Resultado.ok(props)
    }
}
