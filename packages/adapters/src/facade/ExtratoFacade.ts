import {
    CartaoDTO,
    CategoriaDTO,
    ContaDTO,
    ExtratoDTO,
    FiltroExtratoDTO,
    RecorrenciaDTO,
    TransacaoDTO,
    UsuarioDTO,
} from '../dto'
import {
    Cartao,
    Categoria,
    ConsultarExtrato,
    ConsultarExtratos,
    ConsultarFiltrosExtrato,
    ConsultarRecorrencia,
    ConsultarRecorrencias,
    Conta,
    ExcluirRecorrencia,
    ExcluirTransacao,
    Extrato,
    FiltrarExtrato,
    PublicadorEvento,
    Recorrencia,
    RelatorioEvolucaoRecorrencia,
    RepositorioExtrato,
    SalvarRecorrencia,
    SalvarTransacao,
    Transacao,
    Usuario,
} from 'core'

export default class ExtratoFacade {
    constructor(
        private repo: RepositorioExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async salvarTransacao(
        usuario: UsuarioDTO,
        extrato: ExtratoDTO,
        transacao: TransacaoDTO
    ): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarExtrato = Extrato.novo(extrato)
        if (criarExtrato.deuErrado) criarExtrato.lancarErrorSeDeuErrado()
            console.log(criarExtrato.instancia)

        const criarTransacao = Transacao.nova(transacao)
        if (criarTransacao.deuErrado) criarTransacao.lancarErrorSeDeuErrado()
            console.log(criarTransacao.instancia)

        const consultar = new ConsultarExtrato(this.repo)
        const casoDeUso = new SalvarTransacao(this.repo, consultar, this.publicadorEvento)
        const resultado = await casoDeUso.executar(
            { extrato: criarExtrato.instancia, transacao: criarTransacao.instancia },
            criarUsuario.instancia
        )
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async salvarRecorrencia(usuario: UsuarioDTO, recorrencia: RecorrenciaDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarRecorrencia = Recorrencia.nova(recorrencia)
        if (criarRecorrencia.deuErrado) criarRecorrencia.lancarErrorSeDeuErrado()

        const casoDeUso = new SalvarRecorrencia(this.repo, this.publicadorEvento)
        const resultado = await casoDeUso.executar(
            criarRecorrencia.instancia,
            criarUsuario.instancia
        )
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultarTodos(usuario: UsuarioDTO, datas: Date[]): Promise<ExtratoDTO[]> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarExtratos(this.repo)
        const resultado = await casoDeUso.executar(datas, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia.map((e) => e.props)
    }

    async consultarRecorrencia(usuario: UsuarioDTO, id: string): Promise<RecorrenciaDTO | null> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarRecorrencia(this.repo)
        const resultado = await casoDeUso.executar(id, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async consultarRecorrencias(usuario: UsuarioDTO): Promise<RecorrenciaDTO[]> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarRecorrencias(this.repo)
        const resultado = await casoDeUso.executar(criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async consultarFiltrosExtrato(
        cartoes: CartaoDTO[],
        categorias: CategoriaDTO[],
        contas: ContaDTO[]
    ): Promise<FiltroExtratoDTO[]> {
        const criarCartoes = Cartao.novos(cartoes)
        if (criarCartoes.deuErrado) criarCartoes.lancarErrorSeDeuErrado()

        const criarCategorias = Categoria.novas(categorias)
        if (criarCategorias.deuErrado) criarCategorias.lancarErrorSeDeuErrado()

        const criarContas = Conta.novas(contas)
        if (criarContas.deuErrado) criarContas.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarFiltrosExtrato()
        const resultado = await casoDeUso.executar({
            cartoes: criarCartoes.instancia,
            categorias: criarCategorias.instancia,
            contas: criarContas.instancia,
        })
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async excluirTransacao(
        usuario: UsuarioDTO,
        extrato: ExtratoDTO,
        transacao: TransacaoDTO
    ): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarExtrato = Extrato.novo(extrato)
        if (criarExtrato.deuErrado) criarExtrato.lancarErrorSeDeuErrado()

        const criarTransacao = Transacao.nova(transacao)
        if (criarTransacao.deuErrado) criarTransacao.lancarErrorSeDeuErrado()

        const casoDeUso = new ExcluirTransacao(this.repo, this.publicadorEvento)
        const resultado = await casoDeUso.executar(
            { extrato: criarExtrato.instancia, transacao: criarTransacao.instancia },
            criarUsuario.instancia
        )
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluirRecorrencia(usuario: UsuarioDTO, recorrenciaId: string): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ExcluirRecorrencia(this.repo, this.publicadorEvento)
        const resultado = await casoDeUso.executar(recorrenciaId, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async filtarExtrato(extrato: ExtratoDTO, filtros: FiltroExtratoDTO[]): Promise<ExtratoDTO> {
        const criarExtrato = Extrato.novo(extrato)
        if (criarExtrato.deuErrado) criarExtrato.lancarErrorSeDeuErrado()

        const casoDeUso = new FiltrarExtrato()
        const resultado = await casoDeUso.executar({ extrato: criarExtrato.instancia, filtros })
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia.props
    }

    async relatorioEvolucaoRecorrencia(
        extratos: ExtratoDTO[],
        recorrenciaId: string
    ): Promise<TransacaoDTO[]> {
        const criarExtratos = Extrato.novos(extratos)
        if (criarExtratos.deuErrado) criarExtratos.lancarErrorSeDeuErrado()

        const dto = { extratos: criarExtratos.instancia, recorrenciaId }
        const casoDeUso = new RelatorioEvolucaoRecorrencia()
        const resultado = await casoDeUso.executar(dto)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia.map((t) => t.props)
    }
}
