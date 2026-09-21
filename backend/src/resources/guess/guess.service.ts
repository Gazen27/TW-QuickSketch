import { cpSync } from 'node:fs';
import { AppError             } from '../../common/errors/app.error.js';
import { prisma               } from '../../common/utils/prisma.js';
import { normalizeText        } from '../../common/utils/text.normalizer.js';

export async function postGuess(userId : string, sketchId : string, text : string){
  const sketch = await prisma.sketch.findUnique({
    where: { id: sketchId },
    include: { word: { include: { aliases: true } } }
  });

  if(!sketch){ throw new AppError('Sketch not found', 404);}

  const attempts = await prisma.guess.count({where: {userId, sketchId}});
  if(attempts >= 10){ throw new AppError('Zero attempts left', 400);}
  // TODO
}