import {
    AnoMesId,
    Extrato,
    Transacao,
    Recorrencia,
    RepositorioExtrato,
    Resultado,
    Usuario,
} from 'core'
import { fn } from 'utils'
import { ProvedorDados, ComandoBatch } from '..'

export default class ColecaoExtrato implements RepositorioExtrato {
    constructor(private provedor: ProvedorDados) {}

    async salvar(usuario: Usuario, extrato: Extrato): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const doc = this._extratoParaDoc(extrato)
            await this.provedor.salvar(this._caminho(usuario), doc)
            return Resultado.ok()
        })
    }

    async salvarTodos(usuario: Usuario, extratos: Extrato[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const caminhos = extratos.map(() => this._caminho(usuario))
            const docs = extratos.map((extrato) => this._extratoParaDoc(extrato))
            await this.provedor.salvarTodos(caminhos, docs)
            return Resultado.ok()
        })
    }

    async salvarRecorrencia(
        usuario: Usuario,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const caminhos: string[] = []
            const entidades: any[] = []

            caminhos.push(this._caminhoRec(usuario))
            entidades.push(this._recorrenciaParaDoc(recorrencia))

            extratos.forEach((extrato) => {
                caminhos.push(this._caminho(usuario))
                entidades.push(this._extratoParaDoc(extrato))
            })

            await this.provedor.salvarTodos(caminhos, entidades)
            return Resultado.ok()
        })
    }

    async consultarPorId(usuario: Usuario, id: AnoMesId): Promise<Resultado<Extrato | null>> {
        return Resultado.tentar(async () => {
            const doc = await this.provedor.buscarPorId(this._caminho(usuario), id.valor)
            return doc ? Extrato.novo(doc) : Resultado.nulo()
        })
    }

    async consultarPorIds(usuario: Usuario, ids: AnoMesId[]): Promise<Resultado<Extrato[]>> {
        return Resultado.tentar(async () => {
            const valores = ids.map((id) => id.valor)
            const docs = await this.provedor.buscarPorIds(this._caminho(usuario), valores)
            return Extrato.novos(docs ?? [])
        })
    }

    async consultar(usuario: Usuario): Promise<Resultado<Extrato[]>> {
        return Resultado.tentar(async () => {
            const docs = await this.provedor.buscarTodos(this._caminho(usuario))
            return Extrato.novos(docs ?? [])
        })
    }

    async consultarRecorrencias(usuario: Usuario): Promise<Resultado<Recorrencia[]>> {
        return Resultado.tentar(async () => {
            const docs = await this.provedor.buscarTodos(this._caminhoRec(usuario))
            return Recorrencia.novas(docs.filter((doc) => !doc.deleteAt))
        })
    }

    async consultarRecorrenciasPorMes(
        usuario: Usuario,
        data: Date
    ): Promise<Resultado<Recorrencia[]>> {
        return Resultado.tentar(async () => {
            const ultimoDiaDoMes = fn.dt.ultimoDiaDoMes(data)
            const docs = await this.provedor.buscarPor(this._caminhoRec(usuario), [
                { attribute: 'transacao.data', op: '<=', value: ultimoDiaDoMes },
            ])
            return Recorrencia.novas(docs.filter((doc) => !doc.deleteAt))
        })
    }

    async consultarRecorrenciaPorId(
        usuario: Usuario,
        id: string
    ): Promise<Resultado<Recorrencia | null>> {
        return Resultado.tentar(async () => {
            const doc = await this.provedor.buscarPorId(this._caminhoRec(usuario), id)
            if (!doc || doc.deleteAt) return Resultado.nulo()
            return Recorrencia.nova(doc)
        })
    }

    async excluirRecorrencia(
        usuario: Usuario,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const comandos: ComandoBatch[] = []
            comandos.push({
                caminho: this._caminhoRec(usuario),
                entidade: this._recorrenciaParaDoc(recorrencia),
                tipo: 'excluir',
            })

            extratos.forEach((extrato) => {
                comandos.push({
                    caminho: this._caminho(usuario),
                    entidade: this._extratoParaDoc(extrato),
                    tipo: 'salvar',
                })
            })

            await this.provedor.executarTodos(comandos)
            return Resultado.ok()
        })
    }

    private _caminho(usuario: Usuario): string {
        return `extratos/${usuario.email.valor}/mensais`
    }

    private _caminhoRec(usuario: Usuario): string {
        return `extratos/${usuario.email.valor}/recorrencias`
    }

    private _extratoParaDoc(extrato: Extrato): any {
        const props = extrato.props
        const transacoes = props.transacoes
            .map((t) => {
                const transacao = { ...t }
                delete transacao.agruparPor
                delete transacao.virtual
                delete transacao.emMemoria
                return transacao
            })
            .sort(Transacao.sort)

        return {
            id: props.id,
            data: props.data,
            sumario: props.sumario,
            transacoes,
            updatedAt: new Date(),
        }
    }

    private _recorrenciaParaDoc(recorrencia: Recorrencia): any {
        const transacao = recorrencia.props.transacao
        delete transacao?.agruparPor
        delete transacao?.virtual
        delete transacao?.emMemoria
        return { ...recorrencia.props, transacao, updatedAt: new Date(), deletedAt: null }
    }
}
