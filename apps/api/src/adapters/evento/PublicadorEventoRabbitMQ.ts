import { Evento, PublicadorEvento, Resultado } from "core";
import CanalEventosRabbitMQ from "./CanalEventosRabbitMQ";

export default class PublicadorEventoRabbitMQ implements PublicadorEvento {
  constructor(private canalEventos: CanalEventosRabbitMQ) {}

  async publicar(...eventos: Evento[]): Promise<Resultado<void>> {
    return Resultado.tentar(async () => {
      if (eventos.length === 0) return Resultado.ok();

      const canal = await this.canalEventos.obter();

      for (const evento of eventos) {
        const nomeFila = evento.tipo;
        const dados = JSON.stringify(evento);
        await canal.assertQueue(nomeFila, { durable: false });
        canal.sendToQueue(nomeFila, Buffer.from(dados));

        console.log(`📤 Evento publicado na fila "${nomeFila}":`);
      }

      return Resultado.ok();
    });
  }
}
