import { CartaoDTO, ExtratoDTO, UsuarioDTO } from '../dto'
import {
    AtualizarFaturas,
    Cartao,
    ConsultarCartoes,
    ExcluirCartao,
    Extrato,
    RepositorioCartao,
    SalvarCartao,
    Usuario,
} from 'core'

export default class CartaoFacade {
    constructor(readonly repo: RepositorioCartao) {}

    async salvar(usuario: UsuarioDTO, cartao: CartaoDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarCartao = Cartao.novo(cartao)
        if (criarCartao.deuErrado) criarCartao.lancarErrorSeDeuErrado()

        const casoDeUso = new SalvarCartao(this.repo)
        const resultado = await casoDeUso.executar(criarCartao.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluir(usuario: UsuarioDTO, cartao: CartaoDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarCartao = Cartao.novo(cartao)
        if (criarCartao.deuErrado) criarCartao.lancarErrorSeDeuErrado()

        const casoDeUso = new ExcluirCartao(this.repo)
        const resultado = await casoDeUso.executar(criarCartao.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(usuario: UsuarioDTO): Promise<CartaoDTO[]> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarCartoes(this.repo)
        const resultado = await casoDeUso.executar(criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia as CartaoDTO[]
    }

    async atualizarFaturas(usuario: UsuarioDTO, extratos: ExtratoDTO[]): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarExtratos = Extrato.novos(extratos)
        if (criarExtratos.deuErrado) criarExtratos.lancarErrorSeDeuErrado()

        const casoDeUso = new AtualizarFaturas(this.repo)
        const resultado = await casoDeUso.executar(criarExtratos.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }
}
