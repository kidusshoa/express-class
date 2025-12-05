import Note from "../models/Note.js";
//findbyid
//delete
export const getNotes = async (req, res, next) => {
    try{
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json({success: true, count: notes.length, data: notes});
    }catch(err){
        next(err);
    }
}

export const createNote = async (req, res, next) => {
    try{
        const note = await Note.create(req.body);
        res.status(201).json({success: true, data: note});
    }catch(error){
        next(error);
    }
}

export const updateNote = async(req, res, next) => {
    try{
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if(!note){
            return res.status(404).json({success: false, message: "Note not found"});
        }
        res.status(200).json({success: true, data: note});
    }catch(err){
        next(err);
    }
}