import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import imageRouter from "./routes/image.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({message: "image App"})
})

app.use("/images", imageRouter)

app.listen(PORT, () => {
    console.log("server is running")
})


