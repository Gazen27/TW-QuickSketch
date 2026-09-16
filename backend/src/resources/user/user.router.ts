import { Router        } from 'express';
import { signup, login } from './user.controller.js';
import { getInfo       } from './user.controller.js';
import { credentials   } from './user.schema.js';
import * as validate     from '../../common/middleware/validation.js';

export const userRouter = Router();

userRouter.post('/', validate.body(credentials), signup);
userRouter.post('/login', validate.body(credentials), login);
userRouter.get('/:id', getInfo);