import { PrismaClient } from "@prisma/client";
import {
  Cartao,
  CartaoProps,
  Fatura,
  FaturaProps,
  Id,
  RepositorioCartao,
  Resultado,
  Usuario,
} from "core";

export default class CartaoRepositorioPgPrismaAdapter
  implements RepositorioCartao
{
  constructor(private readonly prisma: PrismaClient) {}

  async salvar(usuario: Usuario, cartao: Cartao): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans: any) => {
      await trans.cartoes.upsert({
        where: { id: cartao.id.valor, usuario_id: usuario.id.valor },
        update: this.toDbFromCartao(cartao, usuario),
        create: this.toDbFromCartao(cartao, usuario),
      });

      for (const fatura of cartao.faturas) {
        await trans.faturas.upsert({
          where: {
            id_cartao_id: { id: fatura.id.valor, cartao_id: cartao.id.valor },
          },
          update: this.toDbFromFatura(fatura, cartao),
          create: this.toDbFromFatura(fatura, cartao),
        });
      }
    });

    return Resultado.ok();
  }
  async salvarTodos(
    usuario: Usuario,
    cartoes: Cartao[],
  ): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans: any) => {
      for (const cartao of cartoes) {
        await trans.cartoes.upsert({
          where: { id: cartao.id.valor, usuario_id: usuario.id.valor },
          update: this.toDbFromCartao(cartao, usuario),
          create: this.toDbFromCartao(cartao, usuario),
        });
        for (const fatura of cartao.faturas) {
          await trans.faturas.upsert({
            where: {
              id_cartao_id: { id: fatura.id.valor, cartao_id: cartao.id.valor },
            },
            update: this.toDbFromFatura(fatura, cartao),
            create: this.toDbFromFatura(fatura, cartao),
          });
        }
      }
    });

    return Resultado.ok();
  }
  async consultar(usuario: Usuario): Promise<Resultado<Cartao[]>> {
    const cartoesBd = await this.prisma.cartoes.findMany({
      where: {
        usuario_id: usuario.id.valor,
      },
      include: { faturas: true },
    });
    const cartoesProps = cartoesBd.map((c: any) => this.toCartaoPropsFromDb(c));

    return Cartao.novos(cartoesProps);
  }
  async excluir(usuario: Usuario, cartaoId: Id): Promise<Resultado<void>> {
    await this.prisma.cartoes.delete({
      where: {
        id: cartaoId.valor,
        usuario_id: usuario.id.valor,
      },
    });

    return Resultado.ok();
  }

  private toDbFromCartao(cartao: Cartao, usuario: Usuario) {
    return {
      id: cartao.id.valor,
      descricao: cartao.descricao.valor,
      cor: cartao.cor?.valor,
      bandeira: cartao.bandeira.valor,
      usuario_id: usuario.id.valor,
    };
  }
  private toDbFromFatura(fatura: Fatura, cartao: Cartao) {
    return {
      id: fatura.id.valor,
      cartao_id: cartao.id.valor,
      data: fatura.data,
      valor: fatura.valor,
      valor_planejado: fatura.valorPlanejado,
    };
  }
  private toCartaoPropsFromDb(cartaoDb: any): CartaoProps {
    return {
      id: cartaoDb.id,
      descricao: cartaoDb.descricao,
      cor: cartaoDb.cor,
      bandeira: cartaoDb.bandeira,
      faturas: cartaoDb.faturas.map((f: any) => this.toFaturaPropsFromDb(f)),
    };
  }
  private toFaturaPropsFromDb(fatura: any): FaturaProps {
    return {
      id: fatura.id,
      data: fatura.data,
      valor: parseFloat(fatura.valor),
      valorPlanejado: parseFloat(fatura.valor_planejado),
    };
  }
}
