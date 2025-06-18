import { EventoDTO, ExtratoDTO } from "adapters";
import parseDates from "../../utils/parseDate";
import CanalEventosRabbitMQ from "./CanalEventosRabbitMQ";
import {
  AtualizarFaturas,
  AtualizarSaldos,
  Extrato,
  RepositorioUsuario,
} from "core";

export default class ConsumidorExtratoAlterado {
  constructor(
    private canalEventos: CanalEventosRabbitMQ,
    private casoDeUsoAtualizarFaturas: AtualizarFaturas,
    private casoDeUsoAtualizarSaldos: AtualizarSaldos,
    private repoUsuario: RepositorioUsuario,
  ) {}

  async iniciar(): Promise<void> {
    const canal = await this.canalEventos.obter();

    const nomeFila = "extrato-alterado";

    await canal.assertQueue(nomeFila, { durable: false });

    canal.consume(
      nomeFila,
      async (mensagem) => {
        if (!mensagem) return;

        const dados = mensagem.content.toString();
        const eventoPreDTO = JSON.parse(dados);
        const eventoDTO: EventoDTO = parseDates(eventoPreDTO);
        const extratosDTO: ExtratoDTO[] = eventoDTO.corpo;

        const email = eventoDTO.usuarioEmail!;

        try {
          const consultarUsuario =
            await this.repoUsuario.consultarPorEmail(email);
          if (consultarUsuario.deuErrado || !consultarUsuario.instancia)
            return consultarUsuario.lancarErrorSeDeuErrado();
          const extratos = Extrato.novos(extratosDTO);

          await this.casoDeUsoAtualizarFaturas.executar(
            extratos.instancia,
            consultarUsuario.instancia,
          );

          await this.casoDeUsoAtualizarSaldos.executar(
            extratos.instancia,
            consultarUsuario.instancia,
          );

          canal.ack(mensagem);
          console.log(`✅ Evento "extrato-alterado" consumido com sucesso.`);
        } catch (erro) {
          console.error(
            `❌ Erro ao processar evento "extrato-alterado":`,
            erro,
          );
          canal.nack(mensagem, false, false);
        }
      },
      { noAck: false },
    );
  }
}
