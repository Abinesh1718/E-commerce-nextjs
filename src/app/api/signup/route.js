import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import pool from "../../lib/db";

export async function POST(req) {
    try {
        const { email, password, name } = await req.json();

        // Check if user already exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
        const { rows: existingUsers } = await pool.query(checkUserQuery, [email]);

        if (existingUsers.length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (email, password,name) VALUES ($1, $2,$3) RETURNING *';
        const { rows } = await pool.query(insertUserQuery, [email, hashedPassword, name]);

        const user = rows[0];

        return NextResponse.json({ message: 'Signup successful', user });
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
