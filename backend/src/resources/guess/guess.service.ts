import { AppError              } from '../../common/errors/app.error.js';
import { prisma                } from '../../common/utils/prisma.js';
import { normalizeText         } from '../../common/utils/text.normalizer.js';
import { getSpecificSketch     } from '../sketch/sketch.service.js';
import { incrementGuessCount   } from '../sketch/sketch.service.js';
import { incrementGuessedScore } from '../user/user.service.js';
import { incrementDrawingScore } from '../user/user.service.js';

// checking if a sketch has already been guessed by a specific user
async function alreadyGuessed(userId: string, sketchId: string){
  const result = await prisma.guess.findFirst({
    where: { isCorrect: true, userId, sketchId }});
  if(result){ throw new AppError('Sketch already guessed', 400); }
}

// checking if a user has attempts left on a specific sketch
async function hasAttempts(userId: string, sketchId: string){
  const attempts = await prisma.guess.count({where: {userId, sketchId}});
  if(attempts >= 10){ throw new AppError('Zero attempts left', 400);}
  return attempts;
}

// posting a new guess attempt
export async function postGuess(userId : string, sketchId : string, text : string){
  const sketch = await getSpecificSketch(sketchId);
  if(!sketch){ throw new AppError('Sketch not found', 404);}
  if(userId === sketch.authorId){ throw new AppError('Auto-guess not allowed', 400);}
  await alreadyGuessed(userId, sketchId);
  const attempts = await hasAttempts(userId, sketchId);
  
  text = normalizeText(text);
  const word = normalizeText(sketch.word.text);
  const aliases = sketch.word.aliases.map(alias => normalizeText(alias.text));
  let isCorrect: boolean;
  
  if(text === word || aliases.includes(text)){
    isCorrect = true;
    await incrementGuessedScore(userId);
    await incrementDrawingScore(sketchId);
    await incrementGuessCount(sketchId);
  }
  else{ isCorrect = false; }
  const guess = await prisma.guess.create({data: {text, isCorrect, userId, sketchId}});
  const attemptsLeft = 10 - (attempts +1);
  return { guess, attemptsLeft };
}