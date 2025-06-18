import { NextFunction, Request, Response, Router } from "express";
import ExtratoRecorrenciaDAL from "../../dal/ExtratoRecorrenciaDAL";

export default class ExtratoRecorrenciaExecutarTodosStoreController {
  constructor(
    private server: Router,
    private extratoRecorrenciaDAL: ExtratoRecorrenciaDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/extratos/recorrencias/execucao",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const entidades = req.body;
          const extratosDTO = entidades.slice(1);
          const recorrenciaDTO = entidades[0];
          await this.extratoRecorrenciaDAL.executarTodos(
            usuarioId,
            recorrenciaDTO,
            extratosDTO,
          );
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
