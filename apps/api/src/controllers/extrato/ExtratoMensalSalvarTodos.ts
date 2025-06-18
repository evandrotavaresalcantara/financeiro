import { NextFunction, Request, Response, Router } from "express";
import ExtratoDAL from "../../dal/ExtratoMensalDAL";

export default class ExtratoMensalSalvarTodosStoreController {
  constructor(
    private server: Router,
    private extratoDAL: ExtratoDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/extratos/mensais",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const extratos = req.body;
          await this.extratoDAL.salvarTodos(usuarioId, extratos);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
