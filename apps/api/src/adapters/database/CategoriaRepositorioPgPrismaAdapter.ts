import { PrismaClient } from "@prisma/client";
import {
  Categoria,
  CategoriaProps,
  Id,
  RepositorioCategoria,
  Resultado,
  Usuario,
} from "core";

export default class CategoriaRepositorioPgPrismaAdapter
  implements RepositorioCategoria
{
  constructor(private readonly prisma: PrismaClient) {}

  async salvar(
    usuario: Usuario,
    categoria: Categoria,
  ): Promise<Resultado<void>> {
    await this.prisma.categorias.upsert({
      where: { id: categoria.id.valor },
      update: this.toDbFromCategoria(categoria, usuario),
      create: this.toDbFromCategoria(categoria, usuario),
    });
    return Resultado.ok();
  }
  async salvarTodas(
    usuario: Usuario,
    categorias: Categoria[],
  ): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      for (const categoria of categorias) {
        await trans.categorias.upsert({
          where: { id: categoria.id.valor },
          update: this.toDbFromCategoria(categoria, usuario),
          create: this.toDbFromCategoria(categoria, usuario),
        });
      }
    });
    return Resultado.ok();
  }
  async consultar(usuario: Usuario): Promise<Resultado<Categoria[]>> {
    return Resultado.tentar(async () => {
      const categoriasBD = await this.prisma.categorias.findMany();
      const categoriasProps = categoriasBD.map((c) =>
        this.toCategoriaPropsFromDb(c),
      );
      return Categoria.novas(categoriasProps);
    });
  }
  async excluir(usuario: Usuario, categoriaId: Id): Promise<Resultado<void>> {
    await this.prisma.categorias.delete({
      where: {
        id: categoriaId.valor,
      },
    });
    return Resultado.ok();
  }

  private toDbFromCategoria(categoria: Categoria, usuario: Usuario) {
    return {
      id: categoria.id.valor,
      nome: categoria.nome.valor,
      id_pai: categoria.idPai?.valor,
      usuario_id: usuario.id.valor,
    };
  }
  private toCategoriaPropsFromDb(categoriaBd: any): CategoriaProps {
    return {
      id: categoriaBd.id,
      nome: categoriaBd.nome,
      idPai: categoriaBd.id_pai,
    };
  }
}
