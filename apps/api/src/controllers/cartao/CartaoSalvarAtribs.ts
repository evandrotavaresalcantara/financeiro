import { NextFunction, Request, Response, Router } from "express";
import CartaoDAL from "../../dal/CartaoDAL";

export default class CartaoSalvarAtribsStoreController {
  constructor(
    private server: Router,
    private cartaoDAL: CartaoDAL,
    ...middleware: any[]
  ) {
    this.server.post(
      "/cartoes/:id/atributos",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id;
          const atributos = req.body.atributos;
          await this.cartaoDAL.salvarAtribs(usuarioId, { ...atributos, id });
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
