import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from "../../lib/db";

const SECRET_KEY = 'abinesh';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("Received email and password:", email, password);

        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(query, [email]);

        console.log("Database query result:", rows);

        if (rows.length == 0) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", passwordMatch);

        if (!passwordMatch) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        return NextResponse.json({ message: 'Login successful', token });
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
