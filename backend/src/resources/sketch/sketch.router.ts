import { Router                     } from 'express';
import { sketch                     } from './sketch.schema.js';
import { getSketches, getSketchById } from './sketch.controller.js';
import { postSketch, getSolution    } from './sketch.controller.js';
import { auth                       } from '../../common/middleware/auth.js';
import * as validate                  from '../../common/middleware/validation.js';

export const sketchRouter = Router();

sketchRouter.post('/', auth, validate.body(sketch), postSketch);
sketchRouter.get('/', getSketches);
sketchRouter.get('/:id', getSketchById);
sketchRouter.get('/:id/solution', auth, getSolution);