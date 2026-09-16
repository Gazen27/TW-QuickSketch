import { Router        } from 'express';
import { signup, login } from './user.controller.js';
import { getInfo       } from './user.controller.js';
import { validate      } from '../../common/middleware/validation.js';
import { credentials   } from './user.schema.js';

export const userRouter = Router();

userRouter.post('/', validate(credentials), signup);
userRouter.post('/login', validate(credentials), login);
userRouter.get('/:id', getInfo);