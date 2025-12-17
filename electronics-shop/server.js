import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config()
const PORT = process.env.PORT

connectDB()
const app = express()

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the Electronics Shop API')
})

app.use('/api/users', authRoutes)
app.use('/api/products', productRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
