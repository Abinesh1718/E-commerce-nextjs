import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, category, price, description } = body;

        const result = await pool.query(
            'INSERT INTO products (name, category, price, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, category, price, description]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}
  