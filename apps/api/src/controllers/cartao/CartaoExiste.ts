import { NextFunction, Request, Response, Router } from "express";
import CartaoDAL from "../../dal/CartaoDAL";

export default class CartaoExisteStoreController {
  constructor(
    private server: Router,
    private cartaoDAL: CartaoDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/cartoes/:id/existe",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const existe = await this.cartaoDAL.existe(usuarioId, id);
          res.status(200).json({ existe });
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
