import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { Project } from "@/models/project.model";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const { id } = await params;
        const user = await User.findById(session.user.id);
        if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
        
        const isLiked = user.likedProjects?.some((pid: any) => pid?.toString() === id?.toString());

        if (isLiked) {
            await User.findByIdAndUpdate(session.user.id, { $pull: { likedProjects: id } });
            await Project.findByIdAndUpdate(id, { $pull: { likes: session.user.id } });
        } else {
            await User.findByIdAndUpdate(session.user.id, { $addToSet: { likedProjects: id } });
            await Project.findByIdAndUpdate(id, { $addToSet: { likes: session.user.id } });
        }

        return NextResponse.json({ success: true, isLiked: !isLiked });
    } catch (error: any) {
        console.error("LIKE API ERROR:", error);
        return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
    }
}