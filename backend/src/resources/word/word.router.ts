import { Router } from 'express';
import { getRandomWords } from './word.controller.js';

export const wordRouter = Router();

wordRouter.get('/random', getRandomWords);