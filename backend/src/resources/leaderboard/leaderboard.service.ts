import { prisma     } from '../../common/utils/prisma.js';
import { countUsers } from '../user/user.service.js';

// retrieving players leaderboard
export async function getPlayersLeaderboard(page: number, limit: number){
  const skip = (page - 1) * limit;
  const items = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      guessedScore: true},
    orderBy: { guessedScore: 'desc' },
    skip,
    take: limit
  });
  const total = await countUsers();
  const totalPages = Math.ceil(total/limit);
  return{ items, page, limit, total, totalPages };
}

// retrieving artists leaderboard
export async function getArtistsLeaderboard(page: number, limit: number){
  const skip = (page - 1) * limit;
  const items = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      drawingScore: true},
    orderBy: { drawingScore: 'desc' },
    skip,
    take: limit
  });
  const total = await countUsers();
  const totalPages = Math.ceil(total/limit);
  return{ items, page, limit, total, totalPages };
}