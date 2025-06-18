import { NextFunction, Request, Response, Router } from "express";
import ExtratoRecorrenciaDAL from "../../dal/ExtratoRecorrenciaDAL";

export default class ExtratoRecorrenciaBuscarPoridStoreController {
  constructor(
    private server: Router,
    private extratoRecorrenciaDAL: ExtratoRecorrenciaDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/extratos/recorrencias/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const usuarioId = req.user.id;
          const id = req.params.id as string;
          const recorrenciaDTO = await this.extratoRecorrenciaDAL.buscarPorId(
            usuarioId,
            id,
          );

          if (!recorrenciaDTO) {
            res.status(404).json({
              erro: {
                codigo: 404,
                mensagem: "Extrato recorrência não econtrado",
              },
            });
            return;
          }
          res.status(200).json(recorrenciaDTO);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
