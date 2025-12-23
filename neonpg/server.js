import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const app = express();

const PORT = 5000;
app.get('/', (req, res) => {
    res.send('Hello from Neon PostgreSQL with Express!');
});

app.get('/verify-db', async(req, res) => {
    try{
        const result = await pool.query('SELECT NOW()');
        res.json({message: 'Database connected', time: result.rows[0]});
        
    }catch(error){
        console.error('Database connection error', error);
        res.status(500).json({message: 'Database connection error'});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
