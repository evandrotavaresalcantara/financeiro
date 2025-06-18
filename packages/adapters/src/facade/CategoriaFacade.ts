import { UsuarioDTO, CategoriaDTO } from '../dto'
import {
    Categoria,
    ConsultarCategorias,
    ExcluirCategoria,
    FiltrarCategorias,
    RepositorioCategoria,
    SalvarCategoria,
    SalvarCategorias,
    Usuario,
} from 'core'

export default class CategoriaFacade {
    constructor(readonly repo: RepositorioCategoria) {}

    async salvar(usuario: UsuarioDTO, categoria: CategoriaDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarCategoria = Categoria.nova(categoria)
        if (criarCategoria.deuErrado) criarCategoria.lancarErrorSeDeuErrado()

        const casoDeUso = new SalvarCategoria(this.repo)
        const resultado = await casoDeUso.executar(criarCategoria.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async salvarTodas(usuario: UsuarioDTO, categorias: CategoriaDTO[]): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarCategorias = Categoria.novas(categorias)
        if (criarCategorias.deuErrado) criarCategorias.lancarErrorSeDeuErrado()

        const casoDeUso = new SalvarCategorias(this.repo)
        const resultado = await casoDeUso.executar(
            criarCategorias.instancia,
            criarUsuario.instancia
        )
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluir(usuario: UsuarioDTO, categoria: CategoriaDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarCategoria = Categoria.nova(categoria)
        if (criarCategoria.deuErrado) criarCategoria.lancarErrorSeDeuErrado()

        const casoDeUso = new ExcluirCategoria(this.repo)
        const resultado = await casoDeUso.executar(criarCategoria.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(usuario: UsuarioDTO): Promise<CategoriaDTO[]> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarCategorias(this.repo)
        const resultado = await casoDeUso.executar(criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    filtrar(pesquisa: string, categoriasAgrupadas: CategoriaDTO[]): CategoriaDTO[] {
        const criarCategorias = Categoria.novas(categoriasAgrupadas)
        if (criarCategorias.deuErrado) criarCategorias.lancarErrorSeDeuErrado()
        const filtradas = new FiltrarCategorias(criarCategorias.instancia).filtrar(pesquisa)
        return filtradas.map((cat) => cat.props)
    }
}
