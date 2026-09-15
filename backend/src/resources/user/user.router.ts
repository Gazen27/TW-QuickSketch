import { Router        } from 'express';
import { signup, login } from './user.controller.js';
import { getInfo       } from './user.controller.js';
import { validate      } from '../../common/middleware/validation.js';
import { signupSchema  } from './user.schema.js';

export const userRouter = Router();

userRouter.post('/', validate(signupSchema),signup);
userRouter.post('/login', login);
userRouter.get('/:id', getInfo);