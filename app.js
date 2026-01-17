import express from 'express';
import cors from 'cors'; // 1. IMPORT THIS
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';

import errorMiddleware from "./middleware/error.middleware.js";
import apiRouter from './routes/api.js';

const app = express();

// --- Middleware ---

// 2. ADD THIS BLOCK
app.use(cors({
    origin: 'http://localhost:5173', // The exact URL of your frontend
    credentials: true,               // Required since you are using cookie-parser
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
  console.log(`Served on PORT  http://localhost:${PORT}`);
  await connectToDatabase()
})

export default app;