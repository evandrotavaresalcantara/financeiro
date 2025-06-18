import { Validador } from 'utils'
import Resultado from '../base/Resultado'

export default class Url {
    static readonly ERRO_NULA = 'URL_NULA'
    static readonly ERRO_INVALIDA = 'URL_INVALIDA'

    private constructor(readonly valor: string) {}

    static nova(valor?: string | null): Resultado<Url> {
        const erro =
            Validador.naoNulo(Url.ERRO_NULA, valor) || Validador.url(Url.ERRO_INVALIDA, valor!)

        return erro ? Resultado.falha<Url>({ tipo: erro, valor }) : Resultado.ok(new Url(valor!))
    }
}
