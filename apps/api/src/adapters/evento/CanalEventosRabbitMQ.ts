import amqp from "amqplib";

export default class CanalEventosRabbitMQ {
  private canal?: amqp.Channel;

  static get url(): string {
    const usuario: string | undefined = process.env.RABBITMQ_USUARIO;
    const senha: string | undefined = process.env.RABBITMQ_SENHA;
    const host: string | undefined = process.env.RABBITMQ_HOSTNAME;

    const urlConexao = `amqp://${usuario}:${senha}@${host}`;
    return urlConexao;
  }
  async obter(): Promise<amqp.Channel> {
    if (this.canal) return this.canal;
    const connection = await amqp.connect(CanalEventosRabbitMQ.url);
    this.canal = await connection.createChannel();

    return this.canal;
  }
}
