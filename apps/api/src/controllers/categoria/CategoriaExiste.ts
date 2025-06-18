import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaExisteStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/categorias/:id/existe",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const existe = await this.categoriaDAL.existe(usuarioId, id);
          res.status(200).json({ existe });
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
