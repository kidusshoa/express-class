import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const PORT = process.env.PORT;

app.use(express.json())

app.get("/items", (req, res) => {
    res.json({message: "fetching all items"})
})

app.post("/items", (req, res) => {
    const data = req.body;
    res.json({message: "item created", data: data})
})

app.patch("/items/:id", (req, res) => {
    const { id } = req.params;
    res.json({message: `item ${id} updated`, updatedData: req.body})
})

app.delete("/items/:id", (req, res) => {
    const {id} = req.params;
res.json({message: `item ${id} deleted`})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})