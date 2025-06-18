import { NextFunction, Request, Response, Router } from "express";
import ExtratoRecorrenciaDAL from "../../dal/ExtratoRecorrenciaDAL";

export default class ExtratoRecorrenciaBuscarPorStoreController {
  constructor(
    private server: Router,
    private extratoRecorrenciaDAL: ExtratoRecorrenciaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/extratos/recorrencias/por-data",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const data = req.query.data as string;
          const extratoRecorrenciaDTO =
            await this.extratoRecorrenciaDAL.buscarPor(
              usuarioId,
              new Date(data),
            );
          res.status(200).json(extratoRecorrenciaDTO);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
