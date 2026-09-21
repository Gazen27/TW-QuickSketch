import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './guess.service.js'

export async function postGuess(req: Request, res: Response, next: NextFunction){
  try{
    // TODO
  }
  catch(error){ next(error); }
}