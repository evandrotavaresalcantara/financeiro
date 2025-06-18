import { NextFunction, Request, Response, Router } from "express";
import CartaoDAL from "../../dal/CartaoDAL";

export default class CartaoSalvarStoreController {
  constructor(
    private server: Router,
    private cartaoDAL: CartaoDAL,
    ...middleware: any[]
  ) {
    this.server.put(
      "/cartoes/:id",
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

          const cartao = { ...req.body, id };
          await this.cartaoDAL.salvar(usuarioId, cartao);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
