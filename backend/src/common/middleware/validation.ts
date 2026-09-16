import type { NextFunction, Request, Response } from 'express';
import type { ZodType                         } from 'zod';

export function validate(schema: ZodType){
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.safeParse(req.body);
      next();
    }
    catch(error){ next(error); }
  }
};