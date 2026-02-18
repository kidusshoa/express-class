import {Router} from 'express'
import prisma from "../db.js"

const router = Router()

router.post('/', async (req, res) => {
    const {title, content} = req.body;
    if(!title || !content) {
        res.status(400).json({error: "Title and content are required"})
        return
    }

    try{
        const newNote = await prisma.note.create({
            data: {title, content}
        })
        res.status(201).json(newNote)
    }catch(error) {
        res.status(500).json({error: "Internal server error"})
    }
})

export default router;