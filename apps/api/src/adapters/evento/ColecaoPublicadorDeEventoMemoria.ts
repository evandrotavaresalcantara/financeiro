import { Evento, PublicadorEvento, Resultado } from "core";

export default class ColecaoPublicadorDeEventoMemoria
  implements PublicadorEvento
{
  // TODO: melhorar implementação
  publicar(...eventos: Evento[]): Promise<Resultado<void>> {
    return Resultado.tentar(async () => {
      if (eventos.length === 0) return Resultado.ok();

      return Resultado.ok();
    });
  }
}
