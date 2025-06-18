import { Validador } from 'utils'
import Resultado from '../base/Resultado'
import VO, { VOConfig } from '../base/VO'

export default class Id extends VO<string, VOConfig> {
    static readonly ERRO_VAZIO = 'ID_VAZIO'

    private constructor(
        readonly valor: string,
        readonly cfg?: VOConfig
    ) {
        super(valor, cfg)
    }

    static novo(valor?: string | null, cfg?: VOConfig): Resultado<Id> {
        const { cls, atr } = cfg ?? {}
        const erro = Validador.naoNuloOuVazio(Id.ERRO_VAZIO, valor?.trim())
        return erro
            ? Resultado.falha<Id>({ tipo: erro, valor, cls, atr })
            : Resultado.ok(new Id(valor!.trim(), cfg))
    }

    igual(id: Id) {
        return this.valor === id.valor
    }

    diferente(id: Id) {
        return this.valor !== id.valor
    }
}
