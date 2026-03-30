import { NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";

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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect();
        const { id } = await params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
    }
}