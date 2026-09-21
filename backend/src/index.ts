import 'dotenv/config';
import cors             from 'cors';
import express          from 'express';
import { userRouter   } from './resources/user/user.router.js';
import { wordRouter   } from './resources/word/word.router.js';
import { sketchRouter } from './resources/sketch/sketch.router.js';
import { guessRouter  } from './resources/guess/guess.router.js'
import { errorHandler } from './common/middleware/error.handler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(cors({ origin: 'http://localhost:4200'}));
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// routers
app.use('/users', userRouter);
app.use('/words', wordRouter);
app.use('/sketches', sketchRouter);
app.use('/guess', guessRouter);

// error handler
app.use(errorHandler);

app.listen(PORT, () => { console.log(`server running on port ${PORT}`); });