import express from 'express';
import  Book from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { title, author, publishedYear } = req.body;
        const newBook = await Book.create({
            title,
            author,
            publishedYear
        });
        res.status(201).json(newBook);
    

    }catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        res.status(200).json({
            count: books.length,
            data: books,
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', async(req, res)=> {
    try{
        const {id} = req.params;

        const book = await Book.findById(id)
        if(!book){
            return  res.status(404).json({message: 'Book not found'})
        }

        res.status(200).json(book)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', async(req, res) => {
    try{
        const {id} = req.params;

        const book = await Book.findByIdAndUpdate(id, req.body)
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }
        res.status(200).json(book)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }
        res.status(200).json({message: 'Book deleted successfully'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export default router;