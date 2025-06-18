import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: UsuarioRec;
    }
  }
}

interface UsuarioRec {
  id: string;
  email: string;
  nome: string;
}
