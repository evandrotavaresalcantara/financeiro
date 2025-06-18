import { NextFunction, Request, Response, Router } from "express";
import ContaDAL from "../../dal/ContaDAL";

export default class ContaBuscarPoridStoreController {
  constructor(
    private server: Router,
    private contaDAL: ContaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/contas/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const conta = await this.contaDAL.buscarPorId(usuarioId, id);

          if (!conta) {
            res.status(404).json({
              erro: {
                codigo: 404,
                mensagem: "Conta não econtrada",
              },
            });
            return;
          }

          res.status(200).json(conta);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
