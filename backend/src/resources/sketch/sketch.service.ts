import { AppError             } from '../../common/errors/app.error.js';
import { prisma               } from '../../common/utils/prisma.js';
import { incrementSketchCount } from '../user/user.service.js';

// posting a new sketch and increasing sketch counter
export async function postSketch(authorId : string, wordId: string, drawing : string){
  const word = await prisma.word.findUnique({where: { id: wordId }});
  if(!word){ throw new AppError('Parola non trovata', 404); }
  
  const sketch = await prisma.sketch.create({data: {authorId, wordId, drawing}});
  await incrementSketchCount(authorId);

  return sketch;
}

