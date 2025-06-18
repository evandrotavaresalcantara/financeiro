import { PrismaClient } from "@prisma/client";

interface ContaDTO {
  id: string;
  descricao: string;
  banco: string;
  cor: string;
  saldos: SaldoDTO[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
interface SaldoDTO {
  id: string;
  data: Date;
  acumulado: number;
  creditos: number;
  debitos: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export default class ContaDAL {
  constructor(private readonly prisma: PrismaClient) {}

  async existe(usurioId: string, id: string): Promise<boolean> {
    const existeConta = await this.prisma.contas.findFirst({
      where: { usuario_id: usurioId, id: id },
    });
    return existeConta !== null;
  }
  async buscarPorId(usuarioId: string, id: string): Promise<ContaDTO | null> {
    const contaBd = await this.prisma.contas.findFirst({
      where: { usuario_id: usuarioId, id: id },
      include: { saldos: true },
    });
    return contaBd ? this.toContaPropsFromDb(contaBd) : null;
  }
  async salvarAtribs(usuarioId: string, contaDTO: ContaDTO): Promise<void> {
    await this.prisma.contas.update({
      where: { id: contaDTO.id, usuario_id: usuarioId },
      data: { deleted_at: contaDTO.deletedAt },
    });
  }

  //------------------------------------------------------------------
  async salvar(usuarioId: string, contaDTO: ContaDTO): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      await trans.contas.upsert({
        where: { usuario_id: usuarioId, id: contaDTO.id },
        update: this.toDbFromConta(usuarioId, contaDTO),
        create: this.toDbFromConta(usuarioId, contaDTO),
      });

      for (const saldo of contaDTO.saldos) {
        await trans.saldos.upsert({
          where: {
            id_conta_id: { id: saldo.id, conta_id: contaDTO.id },
          },
          update: this.toDbFromSaldo(saldo, contaDTO),
          create: this.toDbFromSaldo(saldo, contaDTO),
        });
      }
    });
  }
  async salvarTodos(usuarioId: string, contasDTO: ContaDTO[]): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      for (const conta of contasDTO) {
        await trans.contas.upsert({
          where: { usuario_id: usuarioId, id: conta.id },
          update: this.toDbFromConta(usuarioId, conta),
          create: this.toDbFromConta(usuarioId, conta),
        });
        for (const saldo of conta.saldos) {
          await trans.saldos.upsert({
            where: {
              id_conta_id: { id: saldo.id, conta_id: conta.id },
            },
            update: this.toDbFromSaldo(saldo, conta),
            create: this.toDbFromSaldo(saldo, conta),
          });
        }
      }
    });
  }
  async buscarTodos(usuarioId: string): Promise<ContaDTO[]> {
    const contasBd = await this.prisma.contas.findMany({
      where: {
        usuario_id: usuarioId,
      },
      include: { saldos: true },
    });
    const contasDTO = contasBd.map((c) => this.toContaPropsFromDb(c));
    return contasDTO;
  }
  async excluir(usuarioId: string, contaId: string): Promise<void> {
    await this.prisma.contas.delete({
      where: {
        usuario_id: usuarioId,
        id: contaId,
      },
    });
  }

  private toDbFromConta(usuarioId: string, contaDTO: ContaDTO) {
    return {
      id: contaDTO.id,
      usuario_id: usuarioId,
      descricao: contaDTO.descricao,
      banco: contaDTO.banco,
      cor: contaDTO.cor,
      created_at: contaDTO.createdAt,
      updated_at: contaDTO.updatedAt,
      deleted_at: contaDTO.deletedAt,
    };
  }
  private toDbFromSaldo(saldoDTO: SaldoDTO, contaDTO: ContaDTO) {
    return {
      id: saldoDTO.id,
      conta_id: contaDTO.id,
      data: saldoDTO.data,
      acumulado: saldoDTO.acumulado,
      creditos: saldoDTO.creditos,
      debitos: saldoDTO.debitos,
      created_at: saldoDTO.createdAt,
      updated_at: saldoDTO.updatedAt,
      deleted_at: saldoDTO.deletedAt,
    };
  }
  private toContaPropsFromDb(contaDb: any): ContaDTO {
    return {
      id: contaDb.id,
      descricao: contaDb.descricao,
      cor: contaDb.cor,
      banco: contaDb.banco,
      createdAt: contaDb.created_at,
      updatedAt: contaDb.updated_at,
      deletedAt: contaDb.deleted_at,
      saldos: contaDb.saldos.map((f) => this.toSaldoPropsFromDb(f)),
    };
  }
  private toSaldoPropsFromDb(saldoDb: any): SaldoDTO {
    return {
      id: saldoDb.id,
      data: saldoDb.data,
      acumulado: parseFloat(saldoDb.acumulado),
      creditos: parseFloat(saldoDb.creditos),
      debitos: parseFloat(saldoDb.debitos),
      createdAt: saldoDb.created_at,
      updatedAt: saldoDb.updated_at,
      deletedAt: saldoDb.deleted_at,
    };
  }
}
