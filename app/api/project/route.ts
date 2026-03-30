import { NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";
import { v2 as cloudinary } from "cloudinary";
import { arrayBuffer } from "stream/consumers";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as File;
        const category = formData.get("category") as string;
        const githubUrl = formData.get("githubUrl") as string;
        const liveUrl = formData.get("liveUrl") as string;
        
        let tags: string[] = formData.getAll("tags") as string[];
        const tagsString = formData.get("tags") as string;
        if (tags.length <= 1 && typeof tagsString === "string" && tagsString.includes(",")) {
            tags = tagsString.split(",").map(t => t.trim());
        }

        if (!title || !description || !image || !category) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        let imageUrl = "";

        try {
            const bytes = await image.arrayBuffer();
            const bufferImage = Buffer.from(bytes);

            const results: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "projects" }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(bufferImage);
            });
            imageUrl = results?.secure_url;
        } catch (uploadError) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        const project = await Project.create({ author: session.user.id, title, description, image: imageUrl, category, githubUrl, liveUrl, tags });
        return NextResponse.json({ message: "Project created successfully", project }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const projects = await Project.find().populate("author", "username fullName email");
        if (!projects) {
            return NextResponse.json({ error: "No projects found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Projects fetched successfully", projects }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
};
