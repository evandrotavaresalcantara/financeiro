import Resultado from '../base/Resultado'
import { Validador } from 'utils'
import VO, { VOConfig } from '../base/VO'

export default class Cor extends VO<string, VOConfig> {
    static readonly ERRO_NULA = 'COR_NULA'
    static readonly ERRO_INVALIDA = 'COR_INVALIDA'

    private constructor(
        readonly valor: string,
        readonly cfg?: VOConfig
    ) {
        super(valor, cfg)
    }

    static nova(valor?: string | null, cfg?: VOConfig): Resultado<Cor> {
        const { cls, atr } = cfg ?? {}
        const erro =
            Validador.naoNulo(Cor.ERRO_NULA, valor) ||
            Validador.corEmHexa(Cor.ERRO_INVALIDA, valor!)
        return erro
            ? Resultado.falha<Cor>({ tipo: erro, valor, cls, atr })
            : Resultado.ok(new Cor(valor!, cfg))
    }
}
