import Categoria, { CategoriaProps } from './model/Categoria'
import ConsultarCategorias from './service/ConsultarCategorias'
import ExcluirCategoria from './service/ExcluirCategoria'
import FiltrarCategorias from './model/FiltrarCategorias'
import RepositorioCategoria from './provider/RepositorioCategoria'
import SalvarCategoria from './service/SalvarCategoria'
import SalvarCategorias from './service/SalvarCategorias'

export {
    Categoria,
    ConsultarCategorias,
    ExcluirCategoria,
    FiltrarCategorias,
    SalvarCategoria,
    SalvarCategorias,
}
export type { CategoriaProps, RepositorioCategoria }
