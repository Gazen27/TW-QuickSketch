import type { NextFunction, Request, Response } from 'express';
import type { ZodType                         } from 'zod';

// body validation
export function body(schema: ZodType){
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    }
    catch(error){ next(error); }
  }
};

// query validation
export function query(schema: ZodType){
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    }
    catch(error){ next(error); }
  }
};