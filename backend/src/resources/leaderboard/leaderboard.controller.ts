import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import * as service                             from './leaderboard.service.js';

// retrieving players leaderboard
export async function getPlayersLeaderboard(req: Request, res: Response, next: NextFunction){
  try{
    const leaderboard = await service.getPlayersLeaderboard();
    return res.status(200).json(APIResponse.success('Players leaderboard retrieved', leaderboard));
  }
  catch(error){ next(error); }
}

// retrieving artists leaderboard
export async function getArtistsLeaderboard(req: Request, res: Response, next: NextFunction){
  try{
    const leaderboard = await service.getArtistsLeaderboard();
    return res.status(200).json(APIResponse.success('Artists leaderboard retrieved', leaderboard));
  }
  catch(error){ next(error); }
}