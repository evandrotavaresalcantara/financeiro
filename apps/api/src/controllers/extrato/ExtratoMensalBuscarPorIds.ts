import { NextFunction, Request, Response, Router } from "express";
import ExtratoDAL from "../../dal/ExtratoMensalDAL";

export default class ExtratoMensalBuscarPorIdsStoreController {
  constructor(
    private server: Router,
    private extratoDAL: ExtratoDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/extratos/mensais/por-ids",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const ids = req.body.ids;
          const extratosDTO = await this.extratoDAL.buscarPorIds(
            usuarioId,
            ids,
          );
          res.status(200).json(extratosDTO);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
