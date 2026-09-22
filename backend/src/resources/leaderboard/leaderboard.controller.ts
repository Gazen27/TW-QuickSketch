import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './leaderboard.service.js';

// retrieving players leaderboard
export async function getPlayersLeaderboard(req: Request, res: Response, next: NextFunction){
  // TODO
}

// retrieving artists leaderboard
export async function getArtistsLeaderboard(req: Request, res: Response, next: NextFunction){
  // TODO
}