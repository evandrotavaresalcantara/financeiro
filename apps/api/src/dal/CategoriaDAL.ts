import { PrismaClient } from "@prisma/client";

interface CategoriaDTO {
  id: string;
  nome: string;
  idPai: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
export default class CategoriaDAL {
  constructor(private readonly prisma: PrismaClient) {}

  async existe(usuarioId: string, id: string): Promise<boolean> {
    const existeCategoria = await this.prisma.categorias.findFirst({
      where: { usuario_id: usuarioId, id: id },
    });
    return existeCategoria !== null;
  }
  async buscarPorId(
    usuarioId: string,
    id: string,
  ): Promise<CategoriaDTO | null> {
    const categoriaBd = await this.prisma.categorias.findFirst({
      where: { usuario_id: usuarioId, id: id },
    });
    const categoriaDTO = this.toCategoriaDTOFromDb(categoriaBd);
    return categoriaDTO;
  }

  async salvar(usuarioId: string, categoria: CategoriaDTO): Promise<void> {
    await this.prisma.categorias.upsert({
      where: { id: categoria.id, usuario_id: usuarioId },
      update: this.toDbFromCategoria(categoria, usuarioId),
      create: this.toDbFromCategoria(categoria, usuarioId),
    });
  }
  //toDo
  async salvarAtribs(
    usuarioId: string,
    categoriaPros: CategoriaDTO,
  ): Promise<void> {
    await this.prisma.categorias.update({
      where: { id: categoriaPros.id, usuario_id: usuarioId },
      data: { deleted_at: new Date(categoriaPros.deletedAt as Date) },
    });
  }
  async salvarTodos(
    usuarioId: string,
    categorias: CategoriaDTO[],
  ): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      for (const categoria of categorias) {
        await trans.categorias.upsert({
          where: { usuario_id: usuarioId, id: categoria.id },
          update: this.toDbFromCategoria(categoria, usuarioId),
          create: this.toDbFromCategoria(categoria, usuarioId),
        });
      }
    });
  }
  async buscarTodos(usuarioId: string): Promise<CategoriaDTO[]> {
    const categoriasBd = await this.prisma.categorias.findMany({
      where: { usuario_id: usuarioId, deleted_at: null },
    });

    return categoriasBd.map((c) => this.toCategoriaDTOFromDb(c));
  }
  async excluir(usuarioId: string, categoriaId: string): Promise<boolean> {
    const categoriaDb = await this.prisma.categorias.findFirst({
      where: { usuario_id: usuarioId, id: categoriaId },
    });

    if (!categoriaDb) return false;

    await this.prisma.categorias.delete({
      where: {
        usuario_id: usuarioId,
        id: categoriaId,
      },
    });

    return true;
  }

  private toDbFromCategoria(CategoriaDTO: CategoriaDTO, usuarioId: string) {
    return {
      id: CategoriaDTO.id,
      nome: CategoriaDTO.nome,
      id_pai: CategoriaDTO.idPai,
      usuario_id: usuarioId,
      created_at: CategoriaDTO.createdAt,
      updated_at: CategoriaDTO.updatedAt,
      deleted_at: CategoriaDTO.deletedAt,
    };
  }
  private toCategoriaDTOFromDb(categoriaBd: any): CategoriaDTO {
    return {
      id: categoriaBd.id,
      nome: categoriaBd.nome,
      idPai: categoriaBd.id_pai,
      createdAt: categoriaBd.created_at,
      updatedAt: categoriaBd.updated_at,
      deletedAt: categoriaBd.deleted_at,
    };
  }
}
