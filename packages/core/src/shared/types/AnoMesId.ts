import Resultado from '../base/Resultado'
import VO, { VOConfig } from '../base/VO'

export default class AnoMesId extends VO<string, VOConfig> {
    private constructor(
        readonly valor: string,
        readonly cfg?: VOConfig
    ) {
        super(valor, cfg)
    }

    static novo(data: Date | string): Resultado<AnoMesId> {
        if (!data) return Resultado.falha('DATA_NULA')
        if (typeof data === 'string') {
            return Resultado.tentarSync(() => {
                const [ano, mes] = data.split('-')
                if (!ano || !mes)  throw 'DATA_INVALIDA'
                const dt = new Date(Number(ano), Number(mes) - 1, 2)
                return AnoMesId.novo(dt).instancia
            })
        }

        const mes = `${data.getMonth() + 1}`.padStart(2, '0')
        const id = new AnoMesId(`${data.getFullYear()}-${mes}`)
        return Resultado.ok(id)
    }
}
