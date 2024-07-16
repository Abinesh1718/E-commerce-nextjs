import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    let query = 'SELECT * FROM products';
    let values = [];

    if (search) {
        query += ' WHERE name ILIKE $1 OR category ILIKE $1 OR description ILIKE $1';
        values = [`%${search}%`];
    }
    

    try {
        const { rows } = await pool.query(query, values);
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: error.message,
                msg: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
