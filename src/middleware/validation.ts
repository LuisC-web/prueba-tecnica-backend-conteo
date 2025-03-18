import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";

export const handleInputError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const handleValidExistUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ msg: "Usuario no encontrado" });
    return;
  }
  next();
};
