import express,{Request, Response} from "express"
import { PrismaClient } from "@prisma/client"
import {upload} from "../utilities/upload.js"

const router = express.Router()
const prisma = new PrismaClient()

router.post("/", upload.single("file"), async(req: Request, res: Response)=> {
    const {title} = req.body;
    const file = req.file as Express.Multer.File & { location?: string } | undefined;
    
    if(!title){
        res.status(400).json({error: "title is required"})
    }
    try{
        const image = await prisma.image.create({
            data: {
                title,
                url: file?.location || null,
                originalName: file?.originalname || null,
            },
        })
        res.status(201).json(image)

    }catch(error:any){
        console.log(error)
        res.status(500).json({error: "failed to create image"})
    }
})

export default router