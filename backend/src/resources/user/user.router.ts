import { Router        } from 'express';
import { signup, login } from './user.controller.js';
import { getInfo       } from './user.controller.js';

export const userRouter = Router();

userRouter.post('/', signup);
userRouter.post('/login', login);
userRouter.get('/:id', getInfo);