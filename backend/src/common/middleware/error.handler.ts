import type { Request, Response, NextFunction } from 'express';
import      { AppError                        } from '../errors/app.error.js';
import      { APIResponse                     } from '../utils/api.response.js';
import      { ZodError                        } from 'zod';

export const errorHandler = (error : unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  // error type: ZodError (schema)
  if(error instanceof ZodError){
    const [issue] = error.issues;
    const message = issue ? `${issue.path.join('.')} ${issue.message.toLowerCase()}` : 'Invalid input';

    return res.status(400).json(APIResponse.error(message));
  }
  
  // error type: AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(APIResponse.error(error.message));
  }

  // error type: other
  return res.status(500).json(APIResponse.error('Errore esterno'));
};