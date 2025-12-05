import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors'
import {errorHandler} from './middleware/errorMiddleware.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app=express();
const PORT=process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Welcome to Notes App")
})

app.use("/notes", noteRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Notes App is running on port ${PORT}`);
})