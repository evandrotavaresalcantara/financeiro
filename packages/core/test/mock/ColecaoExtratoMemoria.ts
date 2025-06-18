import { AnoMesId, Usuario } from '../../src'
import Extrato from '../../src/extrato/model/Extrato'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import Recorrencia from '../../src/extrato/model/Recorrencia'
import RecorrenciaBuilder from '../data/RecorrenciaBuilder'
import RepositorioExtrato from '../../src/extrato/provider/RepositorioExtrato'
import Resultado from '../../src/shared/base/Resultado'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoExtratoMemoriaProps {
    extratos: Extrato[]
    recorrencias: Recorrencia[]
    usuario: Usuario
}

export default class ColecaoExtratoMemoria implements RepositorioExtrato {
    constructor(
        readonly simularErro: boolean = false,
        private dados: ColecaoExtratoMemoriaProps[] = []
    ) {}

    static comDados() {
        const dados = [
            {
                extratos: [
                    ExtratoBuilder.criar()
                        .comTransacoes([
                            TransacaoBuilder.criar().comId('123').comRecorrenciaId('123').toProps(),
                        ])
                        .agora(),
                    ExtratoBuilder.criar()
                        .comTransacoes([
                            TransacaoBuilder.criar().comId('321').comRecorrenciaId('321').toProps(),
                        ])
                        .agora(),
                ],
                recorrencias: [
                    RecorrenciaBuilder.criar().comId('123').agora(),
                    RecorrenciaBuilder.criar().comId('321').agora(),
                ],
                usuario: UsuarioBuilder.criar().agora(),
            },
        ]
        return new ColecaoExtratoMemoria(false, dados)
    }

    async salvar(usuario: Usuario, extrato: Extrato): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.dados.push({
                    extratos: [extrato],
                    usuario,
                    recorrencias: [],
                })
            } else {
                usuarioEncontrado.extratos.push(extrato)
            }
            return Resultado.ok()
        })
    }
    async salvarTodos(usuario: Usuario, extratos: Extrato[]): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.dados.push({
                    extratos,
                    usuario,
                    recorrencias: [],
                })
            } else {
                usuarioEncontrado.extratos.push(...extratos)
            }
            return Resultado.ok()
        })
    }
    async salvarRecorrencia(
        usuario: Usuario,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.dados.push({
                    extratos,
                    usuario,
                    recorrencias: [recorrencia],
                })
            } else {
                usuarioEncontrado.extratos.push(
                    ExtratoBuilder.criar()
                        .comTransacoes([
                            TransacaoBuilder.criar()
                                .comRecorrenciaId(recorrencia.id.valor)
                                .toProps(),
                        ])
                        .agora()
                )
                usuarioEncontrado.extratos.push(...extratos)
            }
            return Resultado.ok()
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Extrato[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.extratos)
            }
            return Resultado.ok([])
        })
    }

    async consultarPorId(usuario: Usuario, id: AnoMesId): Promise<Resultado<Extrato | null>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                const extratoEncontrado = usuarioEncontrado.extratos.find(
                    (e) => e.id.valor === id.valor
                )
                return Resultado.ok(extratoEncontrado)
            }
            return Resultado.ok(null)
        })
    }

    async consultarPorIds(usuario: Usuario, ids: AnoMesId[]): Promise<Resultado<Extrato[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                const extratosEncontrados = usuarioEncontrado.extratos.filter((e) =>
                    ids.includes(e.id)
                )
                return Resultado.ok(extratosEncontrados)
            }

            return Resultado.ok([])
        })
    }

    async consultarRecorrencias(usuario: Usuario): Promise<Resultado<Recorrencia[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                return Resultado.ok(
                    usuarioEncontrado.extratos
                        .map((e) => e.transacoes)
                        .flat()
                        .filter((t) => t.recorrenciaId)
                        .map((r) => {
                            const paraProps = RecorrenciaBuilder.criar()
                                .comId(r.recorrenciaId!)
                                .toProps()

                            return Recorrencia.nova(paraProps).instancia
                        })
                )
            }
            return Resultado.ok([])
        })
    }

    async consultarRecorrenciasPorMes(
        usuario: Usuario,
        data: Date
    ): Promise<Resultado<Recorrencia[]>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                const recorrencias = usuarioEncontrado.recorrencias.filter((e) => {
                    if (e.dataFim) {
                        return data >= e.transacao.data && data <= e.dataFim
                    } else {
                        return e.transacao.data === data
                    }
                })
                return Resultado.ok(recorrencias)
            }
            return Resultado.ok([])
        })
    }

    async consultarRecorrenciaPorId(
        usuario: Usuario,
        id: string
    ): Promise<Resultado<Recorrencia | null>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find(
                (u) => u.usuario.email.valor === usuario.email.valor
            )
            if (usuarioEncontrado) {
                const recorrenciaEncontrada = usuarioEncontrado.recorrencias.find((r) => {
                    return r.id.valor === id
                })
                return Resultado.ok(recorrenciaEncontrada || null)
            }
            return Resultado.ok(null)
        })
    }

    async excluirRecorrencia(
        usuario: Usuario,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>> {
        if (this.simularErro) return Resultado.falha('ERRO')
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.dados.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.dados.push({
                    extratos,
                    usuario,
                    recorrencias: [recorrencia],
                })
            } else {
                usuarioEncontrado.extratos.push(
                    ExtratoBuilder.criar()
                        .comTransacoes([
                            TransacaoBuilder.criar()
                                .comRecorrenciaId(recorrencia.id.valor)
                                .toProps(),
                        ])
                        .agora()
                )
                usuarioEncontrado.extratos.push(...extratos)
            }
            return Resultado.ok()
        })
    }
}
