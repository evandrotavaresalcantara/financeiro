import { NextFunction, Request, Response, Router } from "express";
import UsuarioDAL from "../../dal/UsuarioDAL";

export default class UsuarioSalvarStoreController {
  constructor(
    private server: Router,
    private usuarioDAL: UsuarioDAL,
    ...middleware: any[]
  ) {
    this.server.put(
      "/usuarios/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = req.params.id;
          const usuario = { ...req.body, id };
          await this.usuarioDAL.salvar(usuario);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
