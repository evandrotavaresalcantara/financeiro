import { NextFunction, Request, Response, Router } from "express";
import ContaDAL from "../../dal/ContaDAL";

export default class ContaSalvarStoreController {
  constructor(
    private server: Router,
    private contaDAL: ContaDAL,
    ...middleware: any[]
  ) {
    this.server.put(
      "/contas/:id",
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

          const conta = { ...req.body, id };
          await this.contaDAL.salvar(usuarioId, conta);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
