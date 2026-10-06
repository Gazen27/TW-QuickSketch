import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { leaderboardSchema               } from './leaderboard.schema.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './leaderboard.service.js';

// retrieving players leaderboard
export async function getPlayersLeaderboard(req: Request, res: Response, next: NextFunction){
  try{
    const result = leaderboardSchema.safeParse(req.query);
    if(!result.success){ throw new AppError('Invalid paging parameters', 400); }

    const { page, limit } = result.data;
    const leaderboard = await service.getPlayersLeaderboard(page, limit);
    return res.status(200).json(APIResponse.success('Players leaderboard retrieved', leaderboard));
  }
  catch(error){ next(error); }
}

// retrieving artists leaderboard
export async function getArtistsLeaderboard(req: Request, res: Response, next: NextFunction){
  try{
    const result = leaderboardSchema.safeParse(req.query);
    if(!result.success){ throw new AppError('Invalid paging parameters', 400); }

    const { page, limit } = result.data;
    const leaderboard = await service.getArtistsLeaderboard(page, limit);
    return res.status(200).json(APIResponse.success('Artists leaderboard retrieved', leaderboard));
  }
  catch(error){ next(error); }
}