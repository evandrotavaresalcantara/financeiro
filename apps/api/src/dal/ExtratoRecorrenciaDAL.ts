import { PrismaClient } from "@prisma/client";
import { fn } from "utils";

interface ExtratoDTO {
  id: string;
  data: Date;
  transacoes: TransacaoDTO[];
  sumario: SumarioDTO;
  transacoesRemovidas?: TransacaoDTO[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
interface SumarioDTO {
  data: Date;
  total: number;
  receitas: number;
  despesas: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
interface TransacaoDTO {
  id: string;
  contaId: string | null;
  cartaoId: string | null;
  categoriaId: string | null;
  numeroParcela: number | null;
  recorrenciaId: string | null;
  nome: string;
  valor: number;
  data: Date;
  consolidada: boolean;
  operacao: string;
  observacoes: string;
  emMemoria: boolean;
  virtual: boolean;
  base: boolean;
  valoresDetalhados: ValoresDetalhadosDTO[];
  agruparPor: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
interface RecorrenciaDTO {
  id: string;
  transacao: TransacaoDTO;
  dataFim: Date | null;
  indefinida: boolean;
  iniciarNaParcela: number;
  qtdeDeParcelas: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
interface ValoresDetalhadosDTO {
  id: string;
  descricao: string;
  valor: number;
  operacao: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export default class ExtratoRecorrenciaDAL {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(
    usuarioId: string,
    id: string,
  ): Promise<RecorrenciaDTO | null> {
    const recorrenciaBd = await this.prisma.recorrencias.findFirst({
      where: { usuario_id: usuarioId, id: id },
      include: { transacoes_base: true },
    });
    const recorrenciaDTO = this.toRecorrenciaPropsFromDb(recorrenciaBd);
    return recorrenciaDTO;
  }
  async buscarPor(usuarioId: string, data: Date): Promise<RecorrenciaDTO[]> {
    const ultimoDiaDoMes = fn.dt.ultimoDiaDoMes(data);

    const recorrenciasDb = await this.prisma.recorrencias.findMany({
      where: {
        usuario_id: usuarioId,
        transacoes_base: {
          is: {
            data: {
              lte: ultimoDiaDoMes,
            },
          },
        },
        deleted_at: null,
      },
      include: {
        transacoes_base: true,
      },
    });

    const recorrenciasDTO = recorrenciasDb.map((r) =>
      this.toRecorrenciaPropsFromDb(r),
    );
    return recorrenciasDTO;
  }
  async buscarTodos(usuarioId: string): Promise<RecorrenciaDTO[]> {
    const recorrenciasBd = await this.prisma.recorrencias.findMany({
      where: { usuario_id: usuarioId },
      include: { transacoes_base: true },
    });

    const recorrenciasDTO = recorrenciasBd.map((r) =>
      this.toRecorrenciaPropsFromDb(r),
    );
    return recorrenciasDTO;
  }
  async salvarTodos(
    usuarioId: string,
    recorrenciaDTO: RecorrenciaDTO,
    extratosDTO: ExtratoDTO[],
  ): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      await trans.recorrencias.upsert({
        where: { id: recorrenciaDTO.id },
        create: this.toDbFromRecorrencia(recorrenciaDTO, usuarioId),
        update: this.toDbFromRecorrencia(recorrenciaDTO, usuarioId),
      });

      await trans.transacoes_base.upsert({
        where: { id: recorrenciaDTO.transacao.id },
        create: this.toDbFromTransacaoBase(recorrenciaDTO.transacao, usuarioId),
        update: this.toDbFromTransacaoBase(recorrenciaDTO.transacao, usuarioId),
      });

      for (const extratoDTO of extratosDTO) {
        await trans.extratos.upsert({
          where: {
            id_usuario_id: {
              id: extratoDTO.id,
              usuario_id: usuarioId,
            },
          },
          update: this.toDbFromExtrato(usuarioId, extratoDTO),
          create: this.toDbFromExtrato(usuarioId, extratoDTO),
        });
        for (const transacao of extratoDTO.transacoes) {
          await trans.transacoes.upsert({
            where: { id: transacao.id },
            create: this.toDbFromTransacao(transacao, usuarioId, extratoDTO.id),
            update: this.toDbFromTransacao(transacao, usuarioId, extratoDTO.id),
          });
        }
      }
    });
  }
  async executarTodos(
    usuarioId: string,
    recorrencia: RecorrenciaDTO,
    extratosDTO: ExtratoDTO[],
  ): Promise<void> {
    await this.prisma.$transaction(async (trans) => {
      await trans.recorrencias.delete({
        where: { id: recorrencia.id },
      });

      for (const extratoDTO of extratosDTO) {
        await trans.extratos.upsert({
          where: {
            id_usuario_id: {
              id: extratoDTO.id,
              usuario_id: usuarioId,
            },
          },
          create: this.toDbFromExtrato(usuarioId, extratoDTO),
          update: this.toDbFromExtrato(usuarioId, extratoDTO),
        });

        for (const transacao of extratoDTO.transacoes) {
          await trans.transacoes.upsert({
            where: { id: transacao.id },
            create: this.toDbFromTransacao(transacao, usuarioId, extratoDTO.id),
            update: this.toDbFromTransacao(transacao, usuarioId, extratoDTO.id),
          });
        }
        for (const transacaoRemovida of extratoDTO.transacoesRemovidas ?? []) {
          await trans.transacoes.delete({
            where: { id: transacaoRemovida.id },
          });
        }
      }
    });
  }

  private toDbFromExtrato(usuarioId: string, extratoDTO: ExtratoDTO) {
    return {
      id: extratoDTO.id,
      data: extratoDTO.data,
      usuario_id: usuarioId,
      sumario_data: extratoDTO.sumario.data,
      sumario_receitas: extratoDTO.sumario.receitas,
      sumario_despesas: extratoDTO.sumario.despesas,
      sumario_total: extratoDTO.sumario.total,
      created_at: extratoDTO.createdAt,
      updated_at: extratoDTO.updatedAt,
      deleted_at: extratoDTO.deletedAt,
    };
  }
  private toDbFromRecorrencia(
    recorrenciaDTO: RecorrenciaDTO,
    usuarioId: string,
  ) {
    return {
      id: recorrenciaDTO.id,
      iniciar_na_parcela: recorrenciaDTO.iniciarNaParcela,
      data_fim: recorrenciaDTO.dataFim,
      indefinida: recorrenciaDTO.indefinida,
      qtde_de_parcelas: recorrenciaDTO.qtdeDeParcelas,
      usuario_id: usuarioId,
      created_at: recorrenciaDTO.createdAt,
      updated_at: recorrenciaDTO.updatedAt,
      deleted_at: recorrenciaDTO.deletedAt,
    };
  }
  private toDbFromTransacaoBase(transacaoDTO: TransacaoDTO, usuarioId: string) {
    return {
      id: transacaoDTO.id,
      conta_id: transacaoDTO.contaId ?? null,
      nome: transacaoDTO.nome,
      usuario_id: usuarioId,
      cartao_id: transacaoDTO.cartaoId ?? null,
      categoria_id: transacaoDTO.categoriaId ?? null,
      recorrencia_id: transacaoDTO.recorrenciaId ?? null,
      valor: transacaoDTO.valor,
      data: transacaoDTO.data,
      operacao: transacaoDTO.operacao,
      consolidada: transacaoDTO.consolidada ?? false,
      observacoes: transacaoDTO.observacoes ?? null,
      numero_parcela: transacaoDTO.numeroParcela ?? null,
      em_memoria: transacaoDTO.emMemoria ?? false,
      virtual: transacaoDTO.virtual ?? false,
      base: transacaoDTO.base,
      agrupar_por: transacaoDTO.agruparPor ?? null,
      created_at: transacaoDTO.createdAt,
      updated_at: transacaoDTO.updatedAt,
      deleted_at: transacaoDTO.deletedAt,
    };
  }
  private toDbFromTransacao(
    transacaoDTO: TransacaoDTO,
    usuarioId: string,
    extratoId: string,
  ) {
    return {
      id: transacaoDTO.id,
      extrato_id: extratoId,
      extrato_usuario_id: usuarioId,
      usuario_id: usuarioId,
      cartao_id: transacaoDTO.cartaoId ?? null,
      conta_id: transacaoDTO.contaId ?? null,
      categoria_id: transacaoDTO.categoriaId ?? null,
      nome: transacaoDTO.nome,
      recorrencia_id: transacaoDTO.recorrenciaId ?? null,
      valor: transacaoDTO.valor,
      data: transacaoDTO.data,
      operacao: transacaoDTO.operacao,
      consolidada: transacaoDTO.consolidada ?? false,
      observacoes: transacaoDTO.observacoes ?? null,
      numero_parcela: transacaoDTO.numeroParcela ?? null,
      em_memoria: transacaoDTO.emMemoria ?? false,
      virtual: transacaoDTO.virtual ?? false,
      agrupar_por: transacaoDTO.agruparPor ?? null,
      base: transacaoDTO.base,
      created_at: transacaoDTO.createdAt,
      updated_at: transacaoDTO.updatedAt,
      deleted_at: transacaoDTO.deletedAt,
    };
  }
  private toRecorrenciaPropsFromDb(recorrenciaBD: any): RecorrenciaDTO {
    return {
      id: recorrenciaBD.id,
      dataFim: recorrenciaBD.data_fim,
      indefinida: recorrenciaBD.indefinida,
      iniciarNaParcela: recorrenciaBD.iniciar_na_parcela,
      qtdeDeParcelas: recorrenciaBD.qtde_de_parcelas,
      createdAt: recorrenciaBD.created_at,
      updatedAt: recorrenciaBD.updated_at,
      deletedAt: recorrenciaBD.deleted_at,
      transacao: this.toTransacaoBasePropsFromDb(recorrenciaBD.transacoes_base),
    };
  }
  private toTransacaoBasePropsFromDb(transacaoDb: any): TransacaoDTO {
    return {
      id: transacaoDb.id,
      contaId: transacaoDb.conta_id,
      cartaoId: transacaoDb.cartao_id,
      categoriaId: transacaoDb.categoria_id,
      numeroParcela: transacaoDb.numero_parcela,
      recorrenciaId: transacaoDb.recorrencia_id,
      nome: transacaoDb.nome,
      valor: parseFloat(transacaoDb.valor),
      data: transacaoDb.data,
      consolidada: transacaoDb.consolidada,
      operacao: transacaoDb.operacao,
      observacoes: transacaoDb.observacoes,
      valoresDetalhados: transacaoDb.valoresDetalhados,
      emMemoria: transacaoDb.emMemoria,
      virtual: transacaoDb.virtual,
      base: transacaoDb.base,
      agruparPor: transacaoDb.agruparPor,
      createdAt: transacaoDb.created_at,
      updatedAt: transacaoDb.updated_at,
      deletedAt: transacaoDb.deleted_at,
    };
  }
}
