import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './sketch.service.js'

// posting a new sketch
export async function postSketch(req: Request, res: Response, next: NextFunction){
  try {
    const { wordId, drawing } = req.body;
    if(!req.userId) { throw new AppError('Not authorized', 401); }
    const newSketch = await service.postSketch(req.userId, wordId, drawing);

    return res.status(201).json(APIResponse.success('Sketch created', newSketch));
  }
  catch (error) { next(error); }
}

// sketches retrieval
export async function getSketches(req: Request, res: Response, next: NextFunction){
  try{
    const sketches = await service.getSketches();
    return res.status(201).json(APIResponse.success('Sketches retrieved', sketches));
  }
  catch(error){ next(error); }
}