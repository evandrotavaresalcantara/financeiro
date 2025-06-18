import { DataReferencia } from '../../shared'
import { EventoProps } from '../../evento'
import { fn } from 'utils'
import { Usuario } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Extrato from '../model/Extrato'
import ExtratosAlterados from '../event/ExtratosAlterados'
import GerarExtrato from '../model/GerarExtrato'
import PublicadorEvento from '../../evento/provider/PublicadorEvento'
import Recorrencia from '../model/Recorrencia'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'
import Transacao, { TransacaoProps } from '../model/Transacao'

export default class SalvarRecorrencia implements CasoDeUso<Recorrencia, void> {
    constructor(
        private repo: RepositorioExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async executar(recorrencia: Recorrencia, usuario: Usuario): Promise<Resultado<void>> {
        if (!recorrencia) return Resultado.falha('RECORRENCIA_NULA')
        if (!usuario) return Resultado.falha('USUARIO_NULO')
        const consultarExtratos = await this.repo.consultar(usuario)
        const extratos = consultarExtratos.instancia
        if (consultarExtratos.deuErrado) return consultarExtratos.comoFalha

        const gerarTodosOsExtratos = await this.gerarExtratos(usuario, extratos, recorrencia)
        const todosOsExtratos = gerarTodosOsExtratos.instancia
        if (gerarTodosOsExtratos.deuErrado) return gerarTodosOsExtratos.comoFalha

        const gerarExtratosAlterados = Resultado.combinar(
            todosOsExtratos.map((extrato) => this.extratosAlterados(extrato, recorrencia))
        )
        if (gerarExtratosAlterados.deuErrado) return gerarExtratosAlterados.comoFalha

        const extratosAlterados = gerarExtratosAlterados.instancia.filter((e) => e) as Extrato[]

        const criarEvento = ExtratosAlterados.novo({
            usuarioEmail: usuario.email.valor,
            corpo: extratosAlterados.map((e) => e.props),
        } as EventoProps)
        if (criarEvento.deuErrado) return criarEvento.comoFalha

        await this.repo.salvarRecorrencia(usuario, extratosAlterados, recorrencia)
        return this.publicadorEvento.publicar(criarEvento.instancia)
    }

    private async gerarExtratos(
        usuario: Usuario,
        extratosAtuais: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<Extrato[]>> {
        const dtRec = recorrencia.transacao.data
        const maiorData = DataReferencia.maiorData

        const min = fn.dt.min(...extratosAtuais.map((e) => e.data), dtRec) ?? new Date()
        const max = fn.dt.max(...extratosAtuais.map((e) => e.data), maiorData) ?? new Date()
        const datas = fn.dt.mesesEntre(min, max)

        return Resultado.combinarAsync(
            datas.map(async (data) => {
                const extrato = extratosAtuais.find((e) => fn.dt.mesmoMes(e.data, data))
                return extrato ? Resultado.ok(extrato) : this.gerarExtrato(usuario, data)
            })
        )
    }

    private async gerarExtrato(usuario: Usuario, data: Date): Promise<Resultado<Extrato>> {
        const consultarRecs = await this.repo.consultarRecorrenciasPorMes(usuario, data)
        if (consultarRecs.deuErrado) return consultarRecs.comoFalha
        const gerarExtrato = GerarExtrato.com(data, consultarRecs.instancia)
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha
        return gerarExtrato
    }

    private extratosAlterados(
        extrato: Extrato,
        recorrencia: Recorrencia
    ): Resultado<Extrato | null> {
        const ano = extrato.data.getFullYear()
        const mes = extrato.data.getMonth() + 1

        const gerarNovaParcela = recorrencia.gerarParcela(ano, mes)
        const novaParcela = gerarNovaParcela.instancia
        if (gerarNovaParcela.deuErrado) return gerarNovaParcela.comoFalha

        const daRecorrencia = (t: Transacao | TransacaoProps) =>
            t.recorrenciaId === recorrencia.id.valor
        const parcelaAtual = extrato.transacoes.find(daRecorrencia)
        const outrasTransacoes = extrato.props.transacoes.filter((t) => !daRecorrencia(t))

        if (parcelaAtual && parcelaAtual.consolidada) return Resultado.nulo()
        if (!novaParcela && !parcelaAtual) return Resultado.nulo()
        if (!novaParcela) return Extrato.novo({ ...extrato.props, transacoes: outrasTransacoes })
        return Extrato.novo({
            ...extrato.props,
            transacoes: [...outrasTransacoes, novaParcela.props],
        })
    }
}
