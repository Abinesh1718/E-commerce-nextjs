import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/uploads/', // Adjust the upload directory as needed
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Something went wrong! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
}); 

apiRoute.use(upload.single('img'));

apiRoute.post(async (req, res) => {
    const { name, category, price, description } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !category || !price || !description || !img) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, category, price, description, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, category, price, description, img]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

