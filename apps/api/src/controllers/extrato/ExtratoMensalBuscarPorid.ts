import { NextFunction, Request, Response, Router } from "express";
import ExtratoDAL from "../../dal/ExtratoMensalDAL";

export default class ExtratoMensalBuscarPoridStoreController {
  constructor(
    private server: Router,
    private extratoDAL: ExtratoDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/extratos/mensais/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const extratoDTO = await this.extratoDAL.buscarPorId(usuarioId, id);

          if (!extratoDTO) {
            res.status(404).json({
              erro: {
                codigo: 404,
                mensagem: "Extrato mensal não econtrado",
              },
            });
            return;
          }

          res.status(200).json(extratoDTO);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
