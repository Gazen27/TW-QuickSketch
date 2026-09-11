import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { userRouter } from './resources/user/user.router.js';
import { sketchRouter } from './resources/sketch/sketch.router.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(cors({ origin: 'http://localhost:4200'}));
app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use(userRouter);
app.use(sketchRouter);

app.listen(PORT, () => { console.log(`server running on port ${PORT}`); });