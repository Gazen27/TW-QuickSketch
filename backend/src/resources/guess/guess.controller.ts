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

// retrieving guess history from an user for a sketch
export async function getGuessHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const sketchId = req.params.sketchId;
    if (typeof sketchId !== 'string') { throw new AppError('Invalid sketch ID', 400); }
    if (!req.userId) { throw new AppError('Not authorized', 401); }

    const guesses = await service.getGuessHistory(req.userId, sketchId);

    return res.status(200).json(APIResponse.success('Guess history retrieved', guesses));
  }
  catch (error) { next(error); }
}