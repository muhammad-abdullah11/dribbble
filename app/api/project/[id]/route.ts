import { NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const project = await Project.findById(id).populate("author", "username fullName email avatarUrl");
        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found", id }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Project fetched successfully", project });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
};

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const project = await Project.findById(id);
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        if (project.author.toString() !== session.user.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const githubUrl = formData.get("githubUrl") as string;
        const liveUrl = formData.get("liveUrl") as string;
        const imageFile = formData.get("image") as File | null;
        let tags: string[] = formData.getAll("tags") as string[];
        const tagsString = formData.get("tags") as string;
        if (tags.length <= 1 && typeof tagsString === "string" && tagsString.includes(",")) {
            tags = tagsString.split(",").map(t => t.trim());
        }

        let imageUrl = project.image;

        if (imageFile) {
            const bytes = await imageFile.arrayBuffer();
            const bufferImage = Buffer.from(bytes);
            const results: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "projects" }, (err, result) => {
                    if (err) reject(err); else resolve(result);
                }).end(bufferImage);
            });
            imageUrl = results?.secure_url;
        }

        const updatedProject = await Project.findByIdAndUpdate(id, { title, description, image: imageUrl, category, githubUrl, liveUrl, tags }, { new: true });
        return NextResponse.json({ success: true, project: updatedProject }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}
