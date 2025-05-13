import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(422).json({ message: result.array() });
    return;
  }
  next();
};
