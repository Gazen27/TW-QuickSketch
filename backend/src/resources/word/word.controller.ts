import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';

// getting three random words from a category
export async function getRandomWords(category : string){
  //TODO
}