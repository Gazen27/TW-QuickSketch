import { Router                } from 'express';
import { getPlayersLeaderboard } from './leaderboard.controller.js';
import { getArtistsLeaderboard } from './leaderboard.controller.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/players', getPlayersLeaderboard);
leaderboardRouter.get('/artists', getArtistsLeaderboard);