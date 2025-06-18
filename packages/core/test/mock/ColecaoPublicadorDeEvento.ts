import Evento from '../../src/evento/model/Evento'
import PublicadorEvento from '../../src/evento/provider/PublicadorEvento'
import Resultado from '../../src/shared/base/Resultado'

export default class ColecaoPublicadorDeEventoMemoria implements PublicadorEvento {
    // TODO: melhorar implementação
    publicar(...eventos: Evento[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            if (eventos.length === 0) return Resultado.ok()
            return Resultado.ok()
        })
    }
}
