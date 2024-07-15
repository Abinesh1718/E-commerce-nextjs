// src/app/api/addproduct/route.js
import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(request) {
    try {
        const { name, category, price, description } = await request.json();

        const result = await pool.query(
            'INSERT INTO products (name, price, category, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, category, description]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error.message, msg: 'Something went wrong' },
            { status: 500 }
        );
    }
}
