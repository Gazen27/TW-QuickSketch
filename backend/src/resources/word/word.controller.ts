import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './word.service.js';

// getting three random words from a category
export async function getRandomWords(req: Request, res: Response, next: NextFunction){
  try{
    const { category } = req.query;
    if(!category || typeof category !== 'string'){ throw new AppError('Categoria non valida', 400); }

    const words = await service.getRandomWords(category);

    return res.status(200).json(APIResponse.success('Parole recuperate', words));
  }
  catch(error){ next(error); }
}