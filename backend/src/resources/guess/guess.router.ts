import { Router                  } from 'express';
import { auth                    } from '../../common/middleware/auth.js';
import { guess                   } from './guess.schema.js';
import { postGuess               } from './guess.controller.js';
import * as validate               from '../../common/middleware/validation.js';

export const guessRouter = Router();

guessRouter.post('/', auth, validate.body(guess), postGuess);