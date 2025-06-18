import { Evento, PublicadorEvento, Resultado } from 'core'
import { ProvedorDados } from '..'

export default class ColecaoEvento implements PublicadorEvento {
    constructor(private provedor: ProvedorDados) {}

    async publicar(...eventos: Evento[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const docs: any = eventos.map((evento) => evento.props)
            const caminhos = docs.map(() => 'eventos')
            await this.provedor.salvarTodos(caminhos, docs)
            return Resultado.ok()
        })
    }

    async excluir(id: string): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await this.provedor.excluir('eventos', id)
            return Resultado.ok()
        })
    }
}
