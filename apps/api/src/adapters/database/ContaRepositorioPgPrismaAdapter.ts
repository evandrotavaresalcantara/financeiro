import { PrismaClient } from "@prisma/client";
import {
  Conta,
  ContaProps,
  Id,
  RepositorioConta,
  Resultado,
  Saldo,
  SaldoProps,
  Usuario,
} from "core";

export default class ContaRepositorioPgPrismaAdapter
  implements RepositorioConta
{
  constructor(private readonly prisma: PrismaClient) {}
  async salvar(usuario: Usuario, conta: Conta): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      await trans.contas.upsert({
        where: { id: conta.id.valor, usuario_id: usuario.id.valor },
        update: this.toDbFromContaSaldo(conta, usuario),
        create: this.toDbFromContaSaldo(conta, usuario),
      });

      for (const saldo of conta.saldos) {
        await trans.saldos.upsert({
          where: {
            id_conta_id: { id: saldo.id.valor, conta_id: conta.id.valor },
          },
          update: this.toDbFromSaldo(saldo, conta),
          create: this.toDbFromSaldo(saldo, conta),
        });
      }
    });

    return Resultado.ok();
  }
  async salvarTodas(
    usuario: Usuario,
    contas: Conta[],
  ): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      for (const conta of contas) {
        await trans.contas.upsert({
          where: { id: conta.id.valor, usuario_id: usuario.id.valor },
          update: this.toDbFromContaSaldo(conta, usuario),
          create: this.toDbFromContaSaldo(conta, usuario),
        });

        for (const saldo of conta.saldos) {
          await trans.saldos.upsert({
            where: {
              id_conta_id: { id: saldo.id.valor, conta_id: conta.id.valor },
            },
            update: this.toDbFromSaldo(saldo, conta),
            create: this.toDbFromSaldo(saldo, conta),
          });
        }
      }
    });

    return Resultado.ok();
  }
  async consultar(usuario: Usuario): Promise<Resultado<Conta[]>> {
    const contasBD = await this.prisma.contas.findMany({
      where: {
        usuario_id: usuario.id.valor,
      },
      include: { saldos: true },
    });

    const contasProps = contasBD.map((c) => this.toContaPropsFromDb(c));
    return Conta.novas(contasProps);
  }
  async excluir(usuario: Usuario, contaId: Id): Promise<Resultado<void>> {
    await this.prisma.contas.delete({
      where: {
        id: contaId.valor,
        usuario_id: usuario.id.valor,
      },
    });

    return Resultado.ok();
  }

  private toDbFromContaSaldo(conta: Conta, usuario: Usuario) {
    return {
      id: conta.id.valor,
      usuario_id: usuario.id.valor,
      descricao: conta.descricao.valor,
      banco: conta.banco.valor,
      cor: conta.cor?.valor,
    };
  }
  private toDbFromSaldo(saldo: Saldo, conta: Conta) {
    return {
      id: saldo.id.valor,
      conta_id: conta.id.valor,
      data: saldo.data,
      acumulado: saldo.acumulado,
      creditos: saldo.creditos,
      debitos: saldo.debitos,
    };
  }
  private toContaPropsFromDb(contaDb: any): ContaProps {
    return {
      id: contaDb.id,
      descricao: contaDb.descricao,
      cor: contaDb.cor,
      banco: contaDb.banco,
      saldos: contaDb.saldos.map((f) => this.toSaldoPropsFromDb(f)),
    };
  }
  private toSaldoPropsFromDb(saldoDb: any): SaldoProps {
    return {
      data: saldoDb.data,
      acumulado: parseFloat(saldoDb.acumulado),
      creditos: parseFloat(saldoDb.creditos),
      debitos: parseFloat(saldoDb.debitos),
    };
  }
}
