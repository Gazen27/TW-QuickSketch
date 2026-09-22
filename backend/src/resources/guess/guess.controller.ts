import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './guess.service.js'

// send a new guess
export async function postGuess(req: Request, res: Response, next: NextFunction){
  try{
    const { sketchId, text } = req.body;
    if(!req.userId){ throw new AppError('Not authorized', 401); }
    const result = await service.postGuess(req.userId, sketchId, text);

    return res.status(201).json(APIResponse.success('Guess registered', result));
  }
  catch(error){ next(error); }
}