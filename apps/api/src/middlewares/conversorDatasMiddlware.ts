import { Request, Response, NextFunction } from "express";
import parseDates from "../utils/parseDate";

export default function conversorDatasMiddlware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bodyDatasConvertidas = parseDates(req.body);
  req.body = bodyDatasConvertidas;
  next();
}
