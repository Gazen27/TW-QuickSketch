import type { Request, Response, NextFunction } from 'express';
import      { getToken, verifyToken           } from '../utils/jwt.js';

export function auth(req: Request, res: Response, next: NextFunction){
  try {
    const token = getToken(req.headers.authorization);
    req.userId = verifyToken(token);
    next();
  }
  catch (error) { next(error); }
}