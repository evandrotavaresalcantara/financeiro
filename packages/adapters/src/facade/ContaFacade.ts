import { ExtratoDTO, UsuarioDTO, ContaDTO } from '../dto'
import {
    AtualizarSaldos,
    ConsultarContas,
    Conta,
    ExcluirConta,
    Extrato,
    RepositorioConta,
    SalvarConta,
    Usuario,
} from 'core'

export default class ContaFacade {
    constructor(readonly repo: RepositorioConta) {}

    async salvar(usuario: UsuarioDTO, conta: ContaDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarConta = Conta.nova(conta)
        if (criarConta.deuErrado) criarConta.lancarErrorSeDeuErrado()

        const casoDeUso = new SalvarConta(this.repo)
        const resultado = await casoDeUso.executar(criarConta.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluir(usuario: UsuarioDTO, conta: ContaDTO): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarConta = Conta.nova(conta)
        if (criarConta.deuErrado) criarConta.lancarErrorSeDeuErrado()

        const casoDeUso = new ExcluirConta(this.repo)
        const resultado = await casoDeUso.executar(criarConta.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(usuario: UsuarioDTO): Promise<ContaDTO[]> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const casoDeUso = new ConsultarContas(this.repo)
        const resultado = await casoDeUso.executar(criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia.map((c) => c.props) as ContaDTO[]
    }

    async atualizarSaldos(usuario: UsuarioDTO, extratos: ExtratoDTO[]): Promise<void> {
        const criarUsuario = Usuario.novo(usuario)
        if (criarUsuario.deuErrado) criarUsuario.lancarErrorSeDeuErrado()

        const criarExtratos = Extrato.novos(extratos)
        if (criarExtratos.deuErrado) criarExtratos.lancarErrorSeDeuErrado()

        const casoDeUso = new AtualizarSaldos(this.repo)
        const resultado = await casoDeUso.executar(criarExtratos.instancia, criarUsuario.instancia)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }
}
