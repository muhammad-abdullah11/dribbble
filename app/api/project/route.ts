import { NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { title, description, image, category, githubUrl, liveUrl, tags } = await req.json();
        if (!title || !description || !image || !category) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const project = await Project.create({ author: session.user.id, title, description, image, category, githubUrl, liveUrl, tags });
        return NextResponse.json({ message: "Project created successfully", project }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
};

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
