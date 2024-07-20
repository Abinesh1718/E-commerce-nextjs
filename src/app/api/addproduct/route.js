import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/uploads/', // Adjust the upload directory as needed
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

export async function POST(req) {
    return new Promise((resolve, reject) => {
        upload(req, {}, async (err) => {
            if (err) {
                console.error(err);
                return resolve(
                    NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
                );
            }

            const { name, category, price, description } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : null;

            try {
                const result = await pool.query(
                    'INSERT INTO products (name, category, price, description, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [name, category, price, description, image]
                );

                resolve(
                    NextResponse.json(result.rows[0], { status: 201 })
                );
            } catch (error) {
                console.error(error);
                resolve(
                    NextResponse.json({ error: error.message }, { status: 500 })
                );
            }
        });
    });
}
