import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaSalvarTodosStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/categorias",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const categorias = req.body.categorias;
          await this.categoriaDAL.salvarTodos(usuarioId, categorias);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
