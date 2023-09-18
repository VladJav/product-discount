import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundMiddleware } from "./middleware/not-found.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello World');
});

app.use(notFoundMiddleware);
app.use(errorHandler);

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}...`);
});

export default app;