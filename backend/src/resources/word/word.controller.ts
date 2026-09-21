import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './word.service.js';

// getting three random words from a category
export async function getRandomWords(req: Request, res: Response, next: NextFunction){
  try{
    const { category } = req.query;
    if(!category || typeof category !== 'string'){ throw new AppError('Non-valid category', 400); }

    const words = await service.getRandomWords(category);
    return res.status(200).json(APIResponse.success('Words retrieved', words));
  }
  catch(error){ next(error); }
}

// retrieving all categories
export async function getCategories(req: Request, res: Response, next: NextFunction){
  try{
    const categories = await service.getCategories();
    return res.status(200).json(APIResponse.success('Categories retrieved', categories));
  }
  catch(error){ next(error); }
}