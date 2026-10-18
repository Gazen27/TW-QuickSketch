import { AppError              } from '../../common/errors/app.error.js';
import { prisma                } from '../../common/utils/prisma.js';
import { incrementSketchCount  } from '../user/user.service.js';
import { calculateDrawingScore } from '../user/user.service.js';

type SketchSortBy = 'createdAt' | 'guessCount';
type SortOrder = 'asc' | 'desc';

// posting a new sketch
export async function postSketch(authorId : string, wordId: string, drawing : string){
  const word = await prisma.word.findUnique({where: { id: wordId }});
  if(!word){ throw new AppError('Word not found', 404); }

  const sketch = await prisma.sketch.create({data: {authorId, wordId, drawing}});
  await incrementSketchCount(authorId);
  await calculateDrawingScore(sketch.id);
  return sketch;
}

// retrieving all sketches with pagination and sorting
export async function getSketches(
  page: number,
  limit: number,
  sortBy: SketchSortBy,
  order: SortOrder
) {
    const skip = (page - 1) * limit;

    return prisma.sketch.findMany({
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
      include: { author: { select: { username: true } } }
    });
  }

// Counting total sketches
export async function countTotalSketches() {
  return prisma.sketch.count();
}

// retrieving a specific sketch with associated word field
export async function getSpecificSketch(sketchId : string){
  return prisma.sketch.findUnique({
    where:   { id: sketchId },
    include: { word: { include: { aliases: true } } }
  });
}

// incrementing the guessed-counter
export async function incrementGuessCount(sketchId: string){
  return prisma.sketch.update({
    where: { id: sketchId },
    data:  { guessCount: {increment: 1}}
  });
}

// getting the solution of a sketch
export async function getSolution(userId: string, sketchId: string){
  const attempts = await prisma.guess.count({ where: {userId, sketchId} });
  if (attempts < 10){ throw new AppError('Solution not available yet', 400); }

  const sketch = await prisma.sketch.findUnique({
    where: { id: sketchId },
    include: { word: true }
  });
  if(!sketch){ throw new AppError('Sketch not found', 404); }
  
  return sketch.word.text;
}