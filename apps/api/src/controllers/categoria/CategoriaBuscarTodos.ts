import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaBuscarTodosStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/categorias",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const categorias = await this.categoriaDAL.buscarTodos(usuarioId);
          res.status(200).json(categorias);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
