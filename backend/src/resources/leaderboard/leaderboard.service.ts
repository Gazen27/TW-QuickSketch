import { prisma                } from '../../common/utils/prisma.js';

// retrieving players leaderboard
export async function getPlayersLeaderboard(page: number, limit: number){
  const skip = (page - 1) * limit;

  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      guessedScore: true},
    orderBy: { guessedScore: 'desc' },
    skip,
    take: limit
  });
}

// retrieving artists leaderboard
export async function getArtistsLeaderboard(page: number, limit: number){
  const skip = (page - 1) * limit;

  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      drawingScore: true},
    orderBy: { drawingScore: 'desc' },
    skip,
    take: limit
  });
}