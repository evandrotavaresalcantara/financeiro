import { Request, NextFunction, Response, Router } from "express";

export default class PingController {
  constructor(
    private server: Router,
    ...middleware: any[]
  ) {
    this.server.post(
      "/ping",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res.json("pong");
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
