import express from 'express';
import cors from 'cors'; // 1. IMPORT THIS
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';

import errorMiddleware from "./middleware/error.middleware.js";
import apiRouter from './routes/api.js';

const app = express();


app.use(cors({
    origin: [
      'http://localhost:5173',
      /\.vercel\.app$/
    ], 
    credentials: true,               
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/clients', apiRouter);

app.get('/', (req, res) => {
  res.send("Form App API")
})

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Served on PORT  ${PORT}`);
  await connectToDatabase()
})

export default app;