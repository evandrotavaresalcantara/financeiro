import { PrismaClient } from "@prisma/client";

interface CartaoDTO {
  id: string;
  descricao: string;
  bandeira: string;
  cor: string;
  faturas: FaturaDTO[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
interface FaturaDTO {
  id: string;
  data: Date;
  valor: number;
  valorPlanejado: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export default class CartaoDAL {
  constructor(private readonly prisma: PrismaClient) {}

  async existe(usuarioId: string, id: string): Promise<boolean> {
    const cartaoDb = await this.prisma.cartoes.findFirst({
      where: { usuario_id: usuarioId, id },
    });

    return cartaoDb ? true : false;
  }
  async buscarPorId(usuarioId: string, id: string): Promise<any | null> {
    const cartaoBd = await this.prisma.cartoes.findUnique({
      where: { usuario_id: usuarioId, id: id },
    });
    const cartaoProps = this.toCartaoPropsFromDb(cartaoBd);
    return cartaoProps;
  }
  async salvarAtribs(
    usuarioId: string,
    categoriaDTO: CartaoDTO,
  ): Promise<void> {
    await this.prisma.cartoes.update({
      where: { usuario_id: usuarioId, id: categoriaDTO.id },
      data: { deleted_at: categoriaDTO.deletedAt },
    });
  }

  //-----------------------------------

  async salvar(usuarioId: string, cartaoDTO: CartaoDTO): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      await trans.cartoes.upsert({
        where: { usuario_id: usuarioId, id: cartaoDTO.id },
        update: this.toDbFromCartao(usuarioId, cartaoDTO),
        create: this.toDbFromCartao(usuarioId, cartaoDTO),
      });

      for (const fatura of cartaoDTO.faturas) {
        await trans.faturas.upsert({
          where: {
            id_cartao_id: { id: fatura.id, cartao_id: cartaoDTO.id },
          },
          update: this.toDbFromFatura(cartaoDTO, fatura),
          create: this.toDbFromFatura(cartaoDTO, fatura),
        });
      }
    });
  }
  async salvarTodos(usuarioId: string, cartoesDTO: CartaoDTO[]): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      for (const cartao of cartoesDTO) {
        await trans.cartoes.upsert({
          where: { usuario_id: usuarioId, id: cartao.id },
          update: this.toDbFromCartao(usuarioId, cartao),
          create: this.toDbFromCartao(usuarioId, cartao),
        });
        for (const fatura of cartao.faturas) {
          await trans.faturas.upsert({
            where: {
              id_cartao_id: { id: fatura.id, cartao_id: cartao.id },
            },
            update: this.toDbFromFatura(cartao, fatura),
            create: this.toDbFromFatura(cartao, fatura),
          });
        }
      }
    });
  }
  async buscarTodos(usuarioId: string): Promise<CartaoDTO[]> {
    const cartoesBd = await this.prisma.cartoes.findMany({
      where: {
        usuario_id: usuarioId,
      },
      include: { faturas: true },
    });
    const cartoesDTO = cartoesBd.map((c) => this.toCartaoPropsFromDb(c));

    return cartoesDTO;
  }
  async excluir(usuarioId: string, cartaoId: string): Promise<void> {
    await this.prisma.cartoes.delete({
      where: {
        usuario_id: usuarioId,
        id: cartaoId,
      },
    });
  }

  private toDbFromCartao(usuarioId: string, cartaoDTO: CartaoDTO) {
    return {
      id: cartaoDTO.id,
      descricao: cartaoDTO.descricao,
      cor: cartaoDTO.cor,
      bandeira: cartaoDTO.bandeira,
      usuario_id: usuarioId,
      created_at: cartaoDTO.createdAt,
      updated_at: cartaoDTO.updatedAt,
      deleted_at: cartaoDTO.deletedAt,
    };
  }
  private toDbFromFatura(cartaoDTO: CartaoDTO, faturaDTO: FaturaDTO) {
    return {
      id: faturaDTO.id,
      cartao_id: cartaoDTO.id,
      data: faturaDTO.data,
      valor: faturaDTO.valor,
      valor_planejado: faturaDTO.valorPlanejado,
      created_at: faturaDTO.createdAt,
      updated_at: faturaDTO.updatedAt,
      deleted_at: faturaDTO.deletedAt,
    };
  }
  private toCartaoPropsFromDb(cartaoDb: any): CartaoDTO {
    return {
      id: cartaoDb.id,
      bandeira: cartaoDb.bandeira,
      cor: cartaoDb.cor,
      descricao: cartaoDb.descricao,
      createdAt: cartaoDb.created_at,
      updatedAt: cartaoDb.updated_at,
      deletedAt: cartaoDb.deleted_at,
      faturas: cartaoDb.faturas.map((f) => this.toFaturaPropsFromDb(f)),
    };
  }
  private toFaturaPropsFromDb(fatura: any): FaturaDTO {
    return {
      id: fatura.id,
      data: fatura.data,
      valor: parseFloat(fatura.valor),
      valorPlanejado: parseFloat(fatura.valor_planejado),
      createdAt: fatura.created_at,
      updatedAt: fatura.updated_at,
      deletedAt: fatura.deleted_at,
    };
  }
}
