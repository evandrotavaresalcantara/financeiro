import { NextFunction, Request, Response, Router } from "express";
import CartaoDAL from "../../dal/CartaoDAL";

export default class CartaoBuscarTodosStoreController {
  constructor(
    private server: Router,
    private cartaoDAL: CartaoDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/cartoes",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const cartoes = await this.cartaoDAL.buscarTodos(usuarioId);
          res.status(200).json(cartoes);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
