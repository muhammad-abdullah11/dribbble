import { NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import dbConnect from "@/utils/dbConnect";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await params;
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found", id }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Project fetched successfully", project });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
    }
}

