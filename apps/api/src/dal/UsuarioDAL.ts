import { PrismaClient } from "@prisma/client";

interface UsuarioDTO {
  id: string;
  nome: string;
  email: string;
  provider: string;
  imagemUrl: string | null;
  config: {};
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export default class UsuarioDAL {
  constructor(private readonly prisma: PrismaClient) {}

  async existe(id: string): Promise<boolean> {
    const existeUsuario = await this.prisma.usuarios.findUnique({
      where: { id: id },
    });
    return existeUsuario !== null;
  }
  async buscarPorId(id: string): Promise<any | null> {
    const usuarioBd = await this.prisma.usuarios.findFirst({
      where: {
        OR: [{ email: id }, { id: id }],
      },
    });
    const usuarioProps = this.toUsuarioPropsFromDb(usuarioBd);
    return usuarioProps;
  }

  async salvar(usuarioDTO: UsuarioDTO): Promise<void> {
    await this.prisma.usuarios.upsert({
      where: { id: usuarioDTO.id },
      update: this.toDbFromUsuario(usuarioDTO),
      create: this.toDbFromUsuario(usuarioDTO),
    });
  }

  private toDbFromUsuario(usuarioDTO: UsuarioDTO) {
    return {
      id: usuarioDTO.id,
      nome: usuarioDTO.nome,
      email: usuarioDTO.email,
      provider: usuarioDTO.provider,
      imagem_url: usuarioDTO.imagemUrl,
      config: usuarioDTO.config,
      created_at: usuarioDTO.createdAt,
      updated_at: usuarioDTO.updatedAt,
      deleted_at: usuarioDTO.deletedAt,
    };
  }
  private toUsuarioPropsFromDb(usuarioDb: any): UsuarioDTO {
    return {
      id: usuarioDb.id,
      nome: usuarioDb.nome,
      email: usuarioDb.email,
      provider: usuarioDb.provider,
      imagemUrl: usuarioDb.imagem_url,
      config: usuarioDb.config,
      createdAt: usuarioDb.created_at,
      updatedAt: usuarioDb.updated_at,
      deletedAt: usuarioDb.deleted_at,
    };
  }
}
