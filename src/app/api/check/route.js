import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ message: "heloooooooo" });
    } catch (error) {
        return NextResponse.json(
            {
                error,
                msg: "Something Went Wrong",
            },
            { status: 400 }
        );
    }
}
