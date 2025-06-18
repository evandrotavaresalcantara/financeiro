import { NextFunction, Request, Response, Router } from "express";
import UsuarioDAL from "../../dal/UsuarioDAL";

export default class UsurioSalvarStoreController {
  constructor(
    private server: Router,
    private usuarioDAL: UsuarioDAL,
    ...middleware: any[]
  ) {
    this.server.get(
      "/usuarios/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const email = req.params.id as string;
          const usuario = await this.usuarioDAL.buscarPorId(email);

          if (!usuario) {
            res.status(404).json({
              erro: {
                codigo: 404,
                mensagem: "Usuário não econtrada",
              },
            });
            return;
          }

          res.status(200).json(usuario);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
