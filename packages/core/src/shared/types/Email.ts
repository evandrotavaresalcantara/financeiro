import { Validador } from 'utils'
import Resultado from '../base/Resultado'
import VO, { VOConfig } from '../base/VO'

export default class Email extends VO<string, VOConfig> {
    static readonly ERRO_NULO = 'EMAIL_NULO'
    static readonly ERRO_INVALIDO = 'EMAIL_INVALIDO'

    private constructor(
        readonly valor: string,
        readonly cfg?: VOConfig
    ) {
        super(valor, cfg)
    }

    static novo(valor?: string, cfg?: VOConfig): Resultado<Email> {
        const { cls, atr } = cfg ?? {}
        const erro =
            Validador.naoNulo(Email.ERRO_NULO, valor) ||
            Validador.email(Email.ERRO_INVALIDO, valor!)

        return erro
            ? Resultado.falha<Email>({ tipo: erro, valor, cls, atr })
            : Resultado.ok(new Email(valor!))
    }
}
