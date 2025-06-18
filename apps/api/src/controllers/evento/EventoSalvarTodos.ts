import { PublicadorEvento } from "core";
import { NextFunction, Request, Response, Router } from "express";

export default class EventoSalvarTodosStoreController {
  constructor(
    private server: Router,
    private publicadorEventos: PublicadorEvento,
    ...middleware: any[]
  ) {
    this.server.post(
      "/eventos",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const eventos = req.body;
          this.publicadorEventos.publicar(...eventos);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
