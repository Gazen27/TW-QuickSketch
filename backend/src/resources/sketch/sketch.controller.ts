import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import      { exploreQuerySchema              } from './sketch.schema.js';
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


// sketches retrieval with pagination and sorting
export async function getSketches(req: Request, res: Response, next: NextFunction){
  try {
    const result = exploreQuerySchema.safeParse(req.query);
    if (!result.success) { throw new AppError('Invalid pagination or sorting parameters', 400); }

    const { page, limit, sortBy, order } = result.data;

    const [sketches, total] = await Promise.all([
      service.getSketches(page, limit, sortBy, order),
      service.countTotalSketches()
    ]);

    return res.status(200).json(
      APIResponse.success('Sketches retrieved', {
        items: sketches,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      })
    );
  }
  catch(error) { next(error); }
}


// retrieving the word associated to a sketch
export async function getSolution(req: Request, res: Response, next: NextFunction){
  try{
    const { id: stringId } = req.params;
    if (typeof stringId !== 'string') { throw new AppError('Invalid sketch id', 400); }
    if (!req.userId) { throw new AppError('Not authorized', 401); }

    const solution = await service.getSolution(req.userId, stringId);
    return res.status(200).json(APIResponse.success('Solution retrieved', solution));
  }
  catch(error){ next(error); }
}