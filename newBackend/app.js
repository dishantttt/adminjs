import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import { connectDb } from './config/databaseConnection.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const db = await connectDb();



app.use('/api/user', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});


