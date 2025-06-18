import { NextFunction, Request, Response, Router } from "express";
import ContaDAL from "../../dal/ContaDAL";

export default class ContaBuscarTodosStoreController {
  constructor(
    private server: Router,
    private contaDAL: ContaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/contas",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const contas = await this.contaDAL.buscarTodos(usuarioId);
          res.status(200).json(contas);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
