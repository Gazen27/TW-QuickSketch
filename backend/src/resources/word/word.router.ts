import { Router         } from 'express';
import { getRandomWords } from './word.controller.js';
import { getCategories } from './word.controller.js';
import { category       } from './word.schema.js';
import * as validate      from '../../common/middleware/validation.js';

export const wordRouter = Router();

wordRouter.get('/categories', getCategories);
wordRouter.get('/random', validate.query(category), getRandomWords);