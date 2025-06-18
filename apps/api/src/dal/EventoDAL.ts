interface EventoDTO {}
export default class EventoDAL {
  async salvarTodos(usuarioId: string, evento: EventoDTO[]): Promise<void> {}

  async excluir(usuarioId: string, categoriaId: string): Promise<void> {}
}
