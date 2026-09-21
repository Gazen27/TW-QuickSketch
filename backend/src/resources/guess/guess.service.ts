import { AppError             } from '../../common/errors/app.error.js';
import { prisma               } from '../../common/utils/prisma.js';
import { normalizeText        } from '../../common/utils/text.normalizer.js';
import { getSpecificSketch    } from '../sketch/sketch.service.js';

// posting a new guess attempt
export async function postGuess(userId : string, sketchId : string, text : string){
  const sketch = await getSpecificSketch(sketchId);
  if(!sketch){ throw new AppError('Sketch not found', 404);}

  const attempts = await prisma.guess.count({where: {userId, sketchId}});
  if(attempts >= 10){ throw new AppError('Zero attempts left', 400);}
  
  text = normalizeText(text);
  const word = normalizeText(sketch.word.text);
  const aliases = sketch.word.aliases.map(alias => normalizeText(alias.text));
  let isCorrect: boolean;

  if(text === word || aliases.includes(text)){ isCorrect = true; }
  else{ isCorrect = false; }
  const guess = await prisma.guess.create({data: {text, isCorrect, userId, sketchId}});
  return guess;
}