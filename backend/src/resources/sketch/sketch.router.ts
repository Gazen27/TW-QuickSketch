import { Router                  } from 'express';
import { category                } from './sketch.schema.js';
import { sketch                  } from './sketch.schema.js';
import { getSketches, postSketch } from './sketch.controller.js';
import { auth                    } from '../../common/middleware/auth.js';

import * as validate     from '../../common/middleware/validation.js';

export const sketchRouter = Router();

sketchRouter.post('/', auth, validate.body(sketch), postSketch);
sketchRouter.get('/', validate.query(category), getSketches);