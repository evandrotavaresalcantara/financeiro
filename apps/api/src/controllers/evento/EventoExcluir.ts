import { NextFunction, Request, Response, Router } from "express";

export default class EventoExcluirStoreController {
  constructor(
    private server: Router,
    ...middleware: any[]
  ) {
    this.server.delete(
      "/eventos/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
