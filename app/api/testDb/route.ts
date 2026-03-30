import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        await dbConnect();
        return NextResponse.json({ message: "MongoDB connected" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "MongoDB connection failed", error });
    }
}