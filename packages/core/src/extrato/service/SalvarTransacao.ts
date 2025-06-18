import { AnoMesId } from '../../shared'
import { EventoProps } from '../../evento'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import ConsultarExtrato from './ConsultarExtrato'
import Extrato from '../model/Extrato'
import ExtratosAlterados from '../event/ExtratosAlterados'
import PublicadorEvento from '../../evento/provider/PublicadorEvento'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'
import Transacao from '../model/Transacao'

interface Entrada {
    extrato: Extrato
    transacao: Transacao
}

export default class SalvarTransacao implements CasoDeUso<Entrada, void> {
    constructor(
        private repo: RepositorioExtrato,
        private consultarExtrato: ConsultarExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async executar(entrada: Entrada, usuario: Usuario): Promise<Resultado<void>> {
        const extrato = entrada.extrato
        const transacao = entrada.transacao

        if (this.perteceAoExtrato(extrato, transacao)) {
            return this.salvarTransacaoNoExtrato(extrato, transacao, usuario)
        } else if (transacao.recorrenciaId) {
            return Resultado.falha({ tipo: 'PARCELA_NAO_PODE_MUDAR_MES' })
        } else {
            return this.salvarTransacaoEmOutroExtrato(extrato, transacao, usuario)
        }
    }

    private async salvarTransacaoNoExtrato(
        extrato: Extrato,
        transacao: Transacao,
        usuario: Usuario
    ) {
        const novoExtrato = this.extratoCom(transacao, extrato)
        await this.repo.salvar(usuario, novoExtrato)
        console.log(novoExtrato)
        return this.publicarEvento(usuario, novoExtrato)
    }

    private async salvarTransacaoEmOutroExtrato(
        extrato: Extrato,
        transacao: Transacao,
        usuario: Usuario
    ) {
        const consultarOutroExtrato = await this.consultarExtrato.executar(transacao.data, usuario)
        if (consultarOutroExtrato.deuErrado) return consultarOutroExtrato.comoFalha

        const outroExtrato = consultarOutroExtrato.instancia
        const outroExtratoAlterado = this.extratoCom(transacao, outroExtrato)
        const extratoAtualAlterado = this.extratoSem(transacao, extrato)

        await this.repo.salvarTodos(usuario, [extratoAtualAlterado, outroExtratoAlterado])
            console.log(extratoAtualAlterado)
            console.log(outroExtratoAlterado)
        this.publicarEvento(usuario, extratoAtualAlterado)
        return this.publicarEvento(usuario, outroExtratoAlterado)
    }

    private extratoSem(transacao: Transacao, extrato: Extrato): Extrato {
        const outrasTransacoes = (extrato.transacoes ?? []).filter((t) => {
            return t.id.valor !== transacao.id.valor
        })
        const criarExtrato = Extrato.novo({
            ...extrato.props,
            transacoes: outrasTransacoes.map((t) => t.props),
        })
        if (criarExtrato.deuErrado) criarExtrato.lancarErrorSeDeuErrado()
        return criarExtrato.instancia
    }

    private extratoCom(transacao: Transacao, extrato: Extrato): Extrato {
        const novoExtrato = this.extratoSem(transacao, extrato)
        const transacoes = [...novoExtrato.transacoes, transacao].sort(Transacao.sort)
        const criarExtrato = Extrato.novo({
            ...novoExtrato.props,
            transacoes: transacoes.map((t) => t.props),
        })
        if (criarExtrato.deuErrado) criarExtrato.lancarErrorSeDeuErrado()
        return criarExtrato.instancia
    }

    private publicarEvento(usuario: Usuario, extrato: Extrato) {
        const evento = ExtratosAlterados.novo({
            usuarioEmail: usuario.email.valor,
            corpo: [extrato.props],
        } as EventoProps).instancia
        console.log(evento)
        return this.publicadorEvento.publicar(evento)
    }

    private perteceAoExtrato(extrato: Extrato, transacao: Transacao) {
        const exAnoMes = AnoMesId.novo(extrato.data).instancia
        const trAnoMes = AnoMesId.novo(transacao.data).instancia
        return exAnoMes.igual(trAnoMes)
    }
}
