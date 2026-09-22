import { prisma                } from '../../common/utils/prisma.js';

// retrieving players leaderboard
export async function getPlayersLeaderboard(){
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      guessedScore: true},
    orderBy: { guessedScore: 'desc' }
  });
}

// retrieving artists leaderboard
export async function getArtistsLeaderboard(){
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      drawingScore: true},
    orderBy: { drawingScore: 'desc' }
  });
}