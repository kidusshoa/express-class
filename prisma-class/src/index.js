import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/note.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/notes', noteRoutes)

app.get('/' ,(req, res) => {
    res.json({message: "Welcome to notes"})
})

app.listen(PORT, () => {
    console.log('Server is running')
})