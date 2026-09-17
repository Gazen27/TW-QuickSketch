import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './sketch.service.js'

// post a new sketch function
export async function postSketch(req: Request, res: Response, next: NextFunction){
  // TODO
}

// sketches retrieval
export async function getSketches(req: Request, res: Response, next: NextFunction){
  // TODO
}