import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler';
import { notFoundMiddleware } from "./middleware/not-found";
import { authRouter } from "./routes/authRoutes";
import {connectDb} from "./db/connect";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const start = async () => {
    await connectDb(process.env.MONGO_URI || '');
    app.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT}...`);
    });
};

start();

export default app;