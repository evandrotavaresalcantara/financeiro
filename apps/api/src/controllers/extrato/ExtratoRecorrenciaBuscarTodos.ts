import { NextFunction, Request, Response, Router } from "express";
import ExtratoRecorrenciaDAL from "../../dal/ExtratoRecorrenciaDAL";

export default class ExtratoRecorrenciaBuscarTodosStoreController {
  constructor(
    private server: Router,
    private extratoRecorrenciaDAL: ExtratoRecorrenciaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/extratos/recorrencias",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const extratoRecorrenciasDTO =
            await this.extratoRecorrenciaDAL.buscarTodos(usuarioId);
          res.status(200).json(extratoRecorrenciasDTO);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
