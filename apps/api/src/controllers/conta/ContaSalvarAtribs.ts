import { NextFunction, Request, Response, Router } from "express";
import ContaDAL from "../../dal/ContaDAL";

export default class ContaSalvarAtribsStoreController {
  constructor(
    private server: Router,
    private contaDAL: ContaDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/contas/:id/atributos",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id;
          const atributos = req.body.atributos;
          await this.contaDAL.salvarAtribs(usuarioId, { ...atributos, id });
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
