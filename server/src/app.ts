import express, {json, Request, Response} from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler';
import { notFoundMiddleware } from "./middleware/not-found";
import { authRouter } from "./routes/authRoutes";
import { connectDb } from "./db/connect";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(json());
app.use(cookieParser(process.env.JWT_REFRESH_SECRET));
app.get('/', (req: Request, res: Response)=>{
    res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const start = async () => {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT}...`);
    });
};

start();

export default app;