import { NextFunction, Request, Response, Router } from "express";
import ExtratoDAL from "../../dal/ExtratoMensalDAL";

export default class ExtratoMensalBuscarTodosStoreController {
  constructor(
    private server: Router,
    private extratoDAL: ExtratoDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/extratos/mensais",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const extratosDTO = await this.extratoDAL.buscarTodos(usuarioId);
          res.status(200).json(extratosDTO);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
