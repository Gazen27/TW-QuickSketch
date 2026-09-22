import { AppError             } from '../../common/errors/app.error.js';
import { prisma               } from '../../common/utils/prisma.js';
import { incrementSketchCount } from '../user/user.service.js';

// posting a new sketch
export async function postSketch(authorId : string, wordId: string, drawing : string){
  const word = await prisma.word.findUnique({where: { id: wordId }});
  if(!word){ throw new AppError('Word not found', 404); }
  const sketch = await prisma.sketch.create({data: {authorId, wordId, drawing}});
  await incrementSketchCount(authorId);

  return sketch;
}

// retrieving all sketches
export async function getSketches(){
  return prisma.sketch.findMany();
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