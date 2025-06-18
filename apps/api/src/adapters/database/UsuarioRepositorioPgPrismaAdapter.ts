import { Prisma, PrismaClient } from "@prisma/client";
import {
  RepositorioUsuario,
  Resultado,
  Usuario,
  UsuarioConfig,
  UsuarioProps,
} from "core";

export default class UsuarioRepositorioPgPrismaAdapter
  implements RepositorioUsuario
{
  constructor(private readonly prisma: PrismaClient) {}

  async salvar(usuario: Usuario): Promise<Resultado<void>> {
    await this.prisma.usuarios.upsert({
      where: {
        id: usuario.id.valor,
      },
      update: this.toDbFromUsuario(usuario),
      create: this.toDbFromUsuario(usuario),
    });
    return Resultado.ok();
  }
  async consultarPorEmail(email: string): Promise<Resultado<Usuario | null>> {
    const usuarioDb = await this.prisma.usuarios.findUnique({
      where: {
        email: email,
      },
    });
    if (!usuarioDb) return Resultado.nulo();

    const usuarioProps = this.toUsuarioPropsFromDb(usuarioDb);
    return Usuario.novo(usuarioProps);
  }

  private toDbFromUsuario(usuario: Usuario): any {
    return {
      id: usuario.id.valor,
      nome: usuario.nome.valor,
      email: usuario.email.valor,
      provider: usuario.provider,
      imagem_url: usuario.imagemUrl?.valor,
      config: this.toDbFromUsuarioConfig(usuario.config),
    };
  }
  private toDbFromUsuarioConfig(config: UsuarioConfig) {
    return {
      esconderSumarios: config.esconderSumarios,
      esconderValores: config.esconderValores,
      menuMini: config.menuMini,
      visualizacao: config.visualizacao,
      exibirFiltros: config.exibirFiltros,
      filtros: config.filtros,
    };
  }
  private toUsuarioPropsFromDb(usuarioDb: any): UsuarioProps {
    return {
      id: usuarioDb.id,
      nome: usuarioDb.nome,
      email: usuarioDb.email,
      provider: usuarioDb.provider,
      imagemUrl: usuarioDb.imagem_url,
      config: usuarioDb.config,
    };
  }
}
