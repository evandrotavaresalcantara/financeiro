import { EventoProps } from '../../evento'
import { Transacao } from '..'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Extrato from '../model/Extrato'
import ExtratosAlterados from '../event/ExtratosAlterados'
import PublicadorEvento from '../../evento/provider/PublicadorEvento'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

interface Entrada {
    extrato: Extrato
    transacao: Transacao
}

export default class ExcluirTransacao implements CasoDeUso<Entrada, void> {
    constructor(
        private repo: RepositorioExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async executar(entrada: Entrada, usuario: Usuario): Promise<Resultado<void>> {
        const { extrato, transacao } = entrada
        
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        if (!extrato) return Resultado.falha('EXTRATO_NULO')
        if (!transacao) return Resultado.falha('TRANSACAO_NULA')

        const outrasTransacoes = (extrato.transacoes ?? []).filter((t) => {
            return t.id.diferente(transacao.id)
        })

        const gerarExtrato = Extrato.novo({
            ...extrato.props,
            transacoes: outrasTransacoes.map((t) => t.props),
        })
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha

        const novoExtrato = gerarExtrato.instancia
        await this.repo.salvar(usuario, novoExtrato)

        const evento = ExtratosAlterados.novo({
            usuarioEmail: usuario.email.valor,
            corpo: [novoExtrato.props],
        } as EventoProps).instancia

        return this.publicadorEvento.publicar(evento)
    }
}
