import type { Request, Response, NextFunction } from 'express';
import      { AppError                        } from '../errors/app.error.js';
import      { APIResponse                     } from '../utils/api.response.js';

export const errorHandler = (error : unknown, req: Request, res: Response, next: NextFunction) => {
  
  // error type: AppError
  if (error instanceof AppError) {
        return res.status(error.statusCode).json(APIResponse.error(error.message));}

  // error type: other
  console.error(error);
  return res.status(500).json(APIResponse.error('Errore interno del server'));
};