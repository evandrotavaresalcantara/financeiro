import { Request, Response, NextFunction } from "express";
import { admin } from "../adapters/auth/firebaseAdmin";
import { ConsultarPorEmail } from "core";

export function checkAuth(consultarPorEmail: ConsultarPorEmail) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token ausente ou malformado" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
      return res
        .status(401)
        .json({ error: "Token ausente após o prefixo Bearer" });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const userRecord = await admin.auth().getUser(decodedToken.uid);

      if (userRecord.disabled) {
        return res.status(403).json({ error: "Usuário desativado" });
      }

      const usuarioResultado = await consultarPorEmail.executar(
        decodedToken.email!,
      );
      if (
        usuarioResultado.deuErrado ||
        !usuarioResultado.comoFalha ||
        !usuarioResultado.instancia
      ) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      req.user = {
        id: usuarioResultado.instancia.id.valor,
        nome: usuarioResultado.instancia.nome.valor,
        email: usuarioResultado.instancia.nome.valor,
      };

      return next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido", details: error });
    }
  };
}
