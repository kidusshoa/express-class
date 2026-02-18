import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const initDb = async () => {
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            task VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT false
        )`);
        console.log('Database initialized');
    }catch(err){
        console.error('Error initializing database', err);
    }
}

initDb();

app.post('/todos', async (req, res) => {
    const {task} = req.body;
    if(!task) {
        res.status(400).json({error: "Task is required"})
    }
    try{
        const result = await pool.query(
            'INSERT INTO todos (task) Values ($1) RETURNING *',
            [task]
        )
        res.status(201).json(result.rows[0])
    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
})

app.get('/todos', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err){
        console.log(err);
        res.status(500).json({error: "Server error"})
    }
})

app.put('/todos/:id', async (req, res) => {
    const {id} = req.params;
    const {task, completed} = req.body;

    try{
        let query, values;
        if (task !== undefined && completed !== undefined) {
            query = 'UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *';
            values = [task, completed, id];
        } else  if (task !== undefined) {
            query = 'UPDATE todos SET task = $1 WHERE id = $2 RETURNING *';
            values = [task, id];
        } else if (completed !== undefined) {
            query = 'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *';
            values = [completed, id];
        } else {
            return res.status(400).json({error: "No fields to update"})
        }

        const result = await pool.query(query, values);
        if(result.rows.length === 0 ){
            res.status(404).json({error: "Todo not found"})
        }

        res.status(200).json(result.rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
    }
})

app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING *',
            [id]
        );
        if(result.rows.length === 0){
            res.status(404).json({error: "Todo not found"})
        }
        res.status(200).json({message: "Todo deleted successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})