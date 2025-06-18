import { NextFunction, Request, Response, Router } from "express";
import CategoriaDAL from "../../dal/CategoriaDAL";

export default class CategoriaSalvarAtribsStoreController {
  constructor(
    private server: Router,
    private categoriaDAL: CategoriaDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/categorias/:id/atributos",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id;
          const atributos = req.body.atributos;
          await this.categoriaDAL.salvarAtribs(usuarioId, { ...atributos, id });
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
