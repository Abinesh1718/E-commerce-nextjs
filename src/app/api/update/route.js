// src/app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function PUT(request, URLParams) {

    const { id, name, price, category } = await request.json();
    console.log("SCSSSS", id);

    try {
        const result = await pool.query(
            `UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *`, // Fixed SQL query
            [name, price, category, id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                {
                    msg: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
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
