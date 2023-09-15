import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hessls Wosrld');
});

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}...`);
});

export default app;