import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaBuscarPoridStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/categorias/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const categoria = await this.categoriaDAL.buscarPorId(usuarioId, id);

          if (!categoria) {
            res.status(404).json({
              erro: {
                codigo: 404,
                mensagem: "Categoria não econtrada",
              },
            });
            return;
          }
          res.status(200).json(categoria);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
