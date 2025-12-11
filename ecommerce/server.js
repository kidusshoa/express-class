import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDB} from './config/db.js'

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

connectDB();

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to E-commerce API')
})

app.listen(PORT, () => {
    console.log(`E-commerce server is running on port ${PORT}`);
})