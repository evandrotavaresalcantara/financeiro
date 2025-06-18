import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaSalvarStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.put(
      "/categorias/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id;

          if (req.body.id && req.body.id !== id) {
            res.status(400).json({
              erro: {
                codigo: 400,
                mensagem: "ID no corpo não corresponde ao ID na URL",
              },
            });
            return;
          }

          const categoria = { ...req.body, id };
          await this.categoriaDAL.salvar(usuarioId, categoria);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
