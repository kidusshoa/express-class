import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    console.log('Bookstore API is running')
    res.send('Bookstore API is running')
})

app.use('/books', bookRoutes)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err)
})