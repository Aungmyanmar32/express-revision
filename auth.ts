import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const middleTest = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).redirect("/signin.html");
  }

  next();
};
