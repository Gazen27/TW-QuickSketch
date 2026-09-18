import { AppError } from '../../common/errors/app.error.js';
import { prisma } from '../../common/utils/prisma.js';

// retrieving words
export async function getRandomWords(category: string) {

  const words = await prisma.$queryRaw<
  { id: string; text: string }[]
  >`
    SELECT id, text
    FROM Word
      WHERE category = ${category}
      ORDER BY RANDOM()
      LIMIT 3
  `;

  if (words.length < 3){
    throw new AppError('Non ci sono abbastanza parole', 500);
  }

  return words;
}