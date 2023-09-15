import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hesslls Wosrld');
});

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}...`);
});