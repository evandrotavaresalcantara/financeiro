import { Prisma, PrismaClient } from "@prisma/client";
import {
  AnoMesId,
  Extrato,
  ExtratoProps,
  Recorrencia,
  RecorrenciaProps,
  RepositorioExtrato,
  Resultado,
  SumarioProps,
  Transacao,
  TransacaoProps,
  Usuario,
} from "core";
import { fn } from "utils";

export default class ExtratoRepositorioPgPrismaAdapter
  implements RepositorioExtrato
{
  constructor(private readonly prisma: PrismaClient) {}

  async salvar(usuario: Usuario, extrato: Extrato): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      await trans.extratos.upsert({
        where: {
          id_usuario_id: {
            id: extrato.id.valor,
            usuario_id: usuario.id.valor,
          },
        },
        update: this.toDbFromExtrato(extrato, usuario),
        create: this.toDbFromExtrato(extrato, usuario),
      });

      for (const transacao of extrato.transacoes) {
        await trans.transacoes.upsert({
          where: { id: transacao.id.valor },
          update: this.toDbFromTransacao(
            transacao,
            usuario.id.valor,
            extrato.id.valor,
          ),
          create: this.toDbFromTransacao(
            transacao,
            usuario.id.valor,
            extrato.id.valor,
          ),
        });
      }
    });
    return Resultado.ok();
  }
  async salvarTodos(
    usuario: Usuario,
    extratos: Extrato[],
  ): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      for (const extrato of extratos) {
        await trans.extratos.upsert({
          where: {
            id_usuario_id: {
              id: extrato.id.valor,
              usuario_id: usuario.id.valor,
            },
          },
          update: this.toDbFromExtrato(extrato, usuario),
          create: this.toDbFromExtrato(extrato, usuario),
        });

        for (const transacao of extrato.transacoes) {
          await trans.transacoes.upsert({
            where: { id: transacao.id.valor },
            update: this.toDbFromTransacao(
              transacao,
              usuario.id.valor,
              extrato.id.valor,
            ),
            create: this.toDbFromTransacao(
              transacao,
              usuario.id.valor,
              extrato.id.valor,
            ),
          });
        }
      }
    });
    return Resultado.ok();
  }
  async salvarRecorrencia(
    usuario: Usuario,
    extratos: Extrato[],
    recorrencia: Recorrencia,
  ): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      await trans.recorrencias.upsert({
        where: { id: recorrencia.id.valor },
        create: this.toDbFromRecorrencia(recorrencia, usuario),
        update: this.toDbFromRecorrencia(recorrencia, usuario),
      });

      await trans.transacoes_base.upsert({
        where: { id: recorrencia.transacao.id.valor },
        create: this.toDbFromTransacaoBase(
          recorrencia.transacao,
          usuario.id.valor,
        ),
        update: this.toDbFromTransacaoBase(
          recorrencia.transacao,
          usuario.id.valor,
        ),
      });

      for (const extrato of extratos) {
        await trans.extratos.upsert({
          where: {
            id_usuario_id: {
              id: extrato.id.valor,
              usuario_id: usuario.id.valor,
            },
          },
          update: this.toDbFromExtrato(extrato, usuario),
          create: this.toDbFromExtrato(extrato, usuario),
        });
        for (const transacao of extrato.transacoes) {
          await trans.transacoes.upsert({
            where: { id: transacao.id.valor },
            create: this.toDbFromTransacao(
              transacao,
              usuario.id.valor,
              extrato.id.valor,
            ),
            update: this.toDbFromTransacao(
              transacao,
              usuario.id.valor,
              extrato.id.valor,
            ),
          });
        }
      }
    });

    return Resultado.ok();
  }
  async consultar(usuario: Usuario): Promise<Resultado<Extrato[]>> {
    const extratosDb = await this.prisma.extratos.findMany({
      where: {
        usuario_id: usuario.id.valor,
      },
      include: {
        transacoes: true,
      },
    });
    const extratos = extratosDb.map((extrato) =>
      this.toExtratoPropsFromDb(extrato),
    );

    return Extrato.novos(extratos);
  }
  async consultarPorId(
    usuario: Usuario,
    id: AnoMesId,
  ): Promise<Resultado<Extrato | null>> {
    const extratoDb = await this.prisma.extratos.findUnique({
      where: { id_usuario_id: { id: id.valor, usuario_id: usuario.id.valor } },
      include: { transacoes: true },
    });

    const extrato = this.toExtratoPropsFromDb(extratoDb);
    return Extrato.novo(extrato);
  }
  async consultarPorIds(
    usuario: Usuario,
    ids: AnoMesId[],
  ): Promise<Resultado<Extrato[]>> {
    const idsValor = ids.map((id) => id.valor);
    const extratosDB = await this.prisma.extratos.findMany({
      where: {
        usuario_id: usuario.id.valor,
        id: {
          in: idsValor,
        },
      },
      include: {
        transacoes: true,
      },
    });
    const extratosProps = extratosDB.map((extrato) =>
      this.toExtratoPropsFromDb(extrato),
    );

    return Extrato.novos(extratosProps);
  }
  async consultarRecorrenciasPorMes(
    usuario: Usuario,
    data: Date,
  ): Promise<Resultado<Recorrencia[]>> {
    const ultimoDiaDoMes = fn.dt.ultimoDiaDoMes(data);

    const recorrenciasDb = await this.prisma.recorrencias.findMany({
      where: {
        usuario_id: usuario.id.valor,
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

    const recorrenciasProps = recorrenciasDb.map((r) =>
      this.toRecorrenciaPropsFromDb(r),
    );
    return Recorrencia.novas(recorrenciasProps);
  }
  async consultarRecorrenciaPorId(
    usuario: Usuario,
    id: string,
  ): Promise<Resultado<Recorrencia | null>> {
    const recorrenciaBd = await this.prisma.recorrencias.findUnique({
      where: { id: id, usuario_id: usuario.id.valor },
      include: { transacoes_base: true },
    });

    const recorrenciaProps = this.toRecorrenciaPropsFromDb(recorrenciaBd);
    return Recorrencia.nova(recorrenciaProps);
  }
  async consultarRecorrencias(
    usuario: Usuario,
  ): Promise<Resultado<Recorrencia[]>> {
    const recorrenciasBd = await this.prisma.recorrencias.findMany({
      where: { usuario_id: usuario.id.valor },
      include: { transacoes_base: true },
    });

    const recorrenciasPropsBd = recorrenciasBd.map((r) =>
      this.toRecorrenciaPropsFromDb(r),
    );

    return Recorrencia.novas(recorrenciasPropsBd);
  }
  async excluirTransacao(
    usuario: Usuario,
    transacao: Transacao,
  ): Promise<Resultado<void>> {
    await this.prisma.transacoes.delete({
      where: {
        id: transacao.id.valor,
        usuario_id: usuario.id.valor,
      },
    });

    return Resultado.ok();
  }
  async excluirRecorrencia(
    usuario: Usuario,
    extratos: Extrato[],
    recorrencia: Recorrencia,
  ): Promise<Resultado<void>> {
    await this.prisma.$transaction(async (trans) => {
      await trans.recorrencias.delete({
        where: { id: recorrencia.id.valor },
      });

      for (const extrato of extratos) {
        await trans.extratos.upsert({
          where: {
            id_usuario_id: {
              id: extrato.id.valor,
              usuario_id: usuario.id.valor,
            },
          },
          create: this.toDbFromExtrato(extrato, usuario),
          update: this.toDbFromExtrato(extrato, usuario),
        });

        for (const transacao of extrato.transacoes) {
          await trans.transacoes.upsert({
            where: { id: transacao.id.valor },
            create: this.toDbFromTransacao(
              transacao,
              usuario.id.valor,
              extrato.id.valor,
            ),
            update: this.toDbFromTransacao(
              transacao,
              usuario.id.valor,
              extrato.id.valor,
            ),
          });
        }
      }
    });

    return Resultado.ok();
  }

  private toDbFromExtrato(extrato: Extrato, usuario: Usuario) {
    return {
      id: extrato.id.valor,
      data: extrato.data,
      usuario_id: usuario.id.valor,
      sumario_data: extrato.sumario.data,
      sumario_receitas: extrato.sumario.receitas,
      sumario_despesas: extrato.sumario.despesas,
      sumario_total: extrato.sumario.total,
    };
  }
  private toDbFromRecorrencia(recorrencia: Recorrencia, usuario: Usuario) {
    return {
      id: recorrencia.id.valor,
      iniciar_na_parcela: recorrencia.iniciarNaParcela,
      data_fim: recorrencia.dataFim,
      indefinida: recorrencia.indefinida,
      qtde_de_parcelas: recorrencia.qtdeDeParcelas,
      usuario_id: usuario.id.valor,
    };
  }
  private toDbFromTransacaoBase(transacao: any, usuarioId: string): any {
    return {
      id: transacao.id.valor,
      conta_id: transacao.contaId ?? null,
      nome: transacao.nome.valor,
      usuario_id: usuarioId,
      cartao_id: transacao.cartaoId ?? null,
      categoria_id: transacao.categoriaId ?? null,
      recorrencia_id: transacao.recorrenciaId ?? null,
      valor: transacao.valor,
      data: transacao.data,
      operacao: transacao.operacao,
      consolidada: transacao.consolidada ?? false,
      observacoes: transacao.observacoes ?? null,
      numero_parcela: transacao.numeroParcela ?? null,
      em_memoria: transacao.emMemoria ?? false,
      virtual: transacao.virtual ?? false,
      base: transacao.base,
      agrupar_por: transacao.agruparPor ?? null,
    };
  }
  private toDbFromTransacao(
    transacao: any,
    usuarioId: string,
    extratoId: string,
  ): any {
    return {
      id: transacao.id.valor,
      extrato_id: extratoId,
      extrato_usuario_id: usuarioId,
      usuario_id: usuarioId,
      cartao_id: transacao.cartaoId ?? null,
      conta_id: transacao.contaId ?? null,
      categoria_id: transacao.categoriaId ?? null,
      nome: transacao.nome.valor,
      recorrencia_id: transacao.recorrenciaId ?? null,
      valor: transacao.valor,
      data: transacao.data,
      operacao: transacao.operacao,
      consolidada: transacao.consolidada ?? false,
      observacoes: transacao.observacoes ?? null,
      numero_parcela: transacao.numeroParcela ?? null,
      em_memoria: transacao.emMemoria ?? false,
      virtual: transacao.virtual ?? false,
      agrupar_por: transacao.agruparPor ?? null,
      base: transacao.base,
    };
  }

  private toExtratoPropsFromDb(extratoDb: any): ExtratoProps {
    return {
      id: extratoDb.id,
      data: extratoDb.data,
      sumario: this.toSumarioPropsFromDb(extratoDb),
      transacoes: extratoDb.transacoes.map((t) =>
        this.toTransacaoPropsFromDb(t),
      ),
    };
  }
  private toRecorrenciaPropsFromDb(recorrenciaBD: any): RecorrenciaProps {
    return {
      id: recorrenciaBD.id,
      dataFim: recorrenciaBD.data_fim,
      indefinida: recorrenciaBD.indefinida,
      iniciarNaParcela: recorrenciaBD.iniciar_na_parcela,
      qtdeDeParcelas: recorrenciaBD.qtde_de_parcelas,
      transacao: this.toTransacaoBasePropsFromDb(recorrenciaBD.transacoes_base),
    };
  }
  private toTransacaoBasePropsFromDb(transacaoDb: any): TransacaoProps {
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
    };
  }
  private toTransacaoPropsFromDb(transacaoDb: any): TransacaoProps {
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
    };
  }
  private toSumarioPropsFromDb(extratoDb: any): SumarioProps {
    return {
      data: extratoDb.sumario_data,
      receitas: parseFloat(extratoDb.sumario_receitas),
      despesas: parseFloat(extratoDb.sumario_despesas),
      total: parseFloat(extratoDb.sumario_total),
    };
  }
}
