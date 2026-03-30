import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { Project } from "@/models/project.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any)?.id;
        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        const projects = await Project.find({ author: new mongoose.Types.ObjectId(userId) })
            .populate("author", "fullName avatarUrl username")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ success: true, message: "Projects fetched successfully", projects }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch projects", error: error.message }, { status: 500 });
    }
}