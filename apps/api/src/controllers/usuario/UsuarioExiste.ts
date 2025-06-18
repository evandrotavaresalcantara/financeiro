import { NextFunction, Request, Response, Router } from "express";
import UsuarioDAL from "../../dal/UsuarioDAL";

export default class UsuarioExisteStoreController {
  constructor(
    private server: Router,
    private usuarioDal: UsuarioDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/usuarios/:id/existe",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = req.params.id as string;
          const existe = await this.usuarioDal.existe(id);
          res.status(200).json({ existe });
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
