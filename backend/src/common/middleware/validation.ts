import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

import { AppError } from '../errors/app.error.js';

export function validate(schema: ZodType){
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success){
      return next(new AppError('Dati della richiesta non validi', 400));
    }

    next();
  }
};