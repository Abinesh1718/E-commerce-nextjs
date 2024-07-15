
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function DELETE(request) {

    console.log(request);
    try {
        const id = request.nextUrl.pathname.split('/').pop();
        console.log("Product ID to delete:", id);


        // Ensure ID is provided
        if (!id) {
            return NextResponse.json(
                { msg: "Product ID is required" },
                { status: 400 }
            );
        }

        // Delete the product from the database
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { msg: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { msg: "Product deleted successfully" },
            { status: 200 }
        );
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
