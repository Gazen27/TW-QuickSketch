import { Router }         from 'express';
import { login, signup }  from './user.controller.js';

export const userRouter = Router();

userRouter.post('/users', signup);
userRouter.post('/users/login', login);