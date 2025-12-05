import express from 'express';
import {getNotes, createNote, updateNote} from '../controller/noteController.js';

const router = express.Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:id").patch(updateNote);


export default router;