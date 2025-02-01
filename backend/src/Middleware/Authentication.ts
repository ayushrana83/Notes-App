import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

declare global {
    namespace Express{
        interface Request {
            userId: string;
        }
    }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("req" , req);
    // console.log("req.cookie" , req.cookies);
    const token = req.cookies.token;
    if (!token) {
      res.status(500).json({ message: "not authenticated" });
      return;
    }
    const decode = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as jwt.JwtPayload;

    if (!decode || !decode.userId) {
      res.status(400).json({ message: "unauthorized" });
      return;
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({message : "error in authentication", error});
  }
};
