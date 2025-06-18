import { EventoProps } from '../../evento'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Extrato, { ExtratoProps } from '../model/Extrato'
import ExtratosAlterados from '../event/ExtratosAlterados'
import PublicadorEvento from '../../evento/provider/PublicadorEvento'
import Recorrencia from '../model/Recorrencia'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'
import Transacao, { TransacaoProps } from '../model/Transacao'

export default class ExcluirRecorrencia implements CasoDeUso<string, void> {
    constructor(
        private repo: RepositorioExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async executar(recorrenciaId: string, usuario: Usuario): Promise<Resultado<void>> {
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        
        const consultar = await this.repo.consultarRecorrenciaPorId(usuario, recorrenciaId)
        if (consultar.deuErrado) return consultar.comoFalha

        const recorrencia = consultar.instancia
        if (!recorrencia) return Resultado.ok()

        const consultarExtratos = await this.repo.consultar(usuario)
        if (consultarExtratos.deuErrado) return consultarExtratos.comoFalha

        const extratos = consultarExtratos.instancia
        const gerarExtratosAlterados = Resultado.combinar(
            extratos.map((extrato) => this.extratosAlterados(extrato, recorrencia))
        )
        if (gerarExtratosAlterados.deuErrado) return gerarExtratosAlterados.comoFalha

        const extratosAlterados = gerarExtratosAlterados.instancia.filter((e) => e) as Extrato[]

        const criarEvento = ExtratosAlterados.novo({
            usuarioEmail: usuario.email.valor,
            corpo: extratosAlterados.map((e) => e.props),
        } as EventoProps)
        if (criarEvento.deuErrado) return criarEvento.comoFalha

        await this.repo.excluirRecorrencia(usuario, extratosAlterados, recorrencia)
        return this.publicadorEvento.publicar(criarEvento.instancia)
    }

    private extratosAlterados(
        extrato: Extrato,
        recorrencia: Recorrencia
    ): Resultado<Extrato | null> {
        const daRecorrencia = (t: Transacao | TransacaoProps) =>
            t.recorrenciaId === recorrencia.id.valor

        const parcela = extrato.transacoes.find(daRecorrencia)
        if (!parcela || parcela.consolidada) return Resultado.nulo()

        const props: ExtratoProps = {
            ...extrato.props,
            transacoes: extrato.props.transacoes.filter((t) => !daRecorrencia(t)),
        }

        return Extrato.novo(props)
    }
}
