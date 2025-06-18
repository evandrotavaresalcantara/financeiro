import { NextFunction, Request, Response, Router } from "express";
import ExtratoDAL from "../../dal/ExtratoMensalDAL";

export default class ExtratoMensalSalvarStoreController {
  constructor(
    private server: Router,
    private extratoMensalDAL: ExtratoDAL,
    ...middleware: any[]
  ) {
    this.server.put(
      "/extratos/mensais/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id;
          const extrato = req.body;

          if (req.body.id && req.body.id !== id) {
            res.status(400).json({
              erro: {
                codigo: 400,
                mensagem: "ID no corpo não corresponde ao ID na URL",
              },
            });
            return;
          }

          await this.extratoMensalDAL.salvar(usuarioId, extrato);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
