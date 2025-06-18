import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaExcluirStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.delete(
      "/categorias/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const categoriaExcluida = await this.categoriaDAL.excluir(
            usuarioId,
            id,
          );

          if (!categoriaExcluida) {
            res.status(404).json({
              erro: {
                codigo: 404,
                mensagem: "Categoria não encontrada",
              },
            });
            return;
          }
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
