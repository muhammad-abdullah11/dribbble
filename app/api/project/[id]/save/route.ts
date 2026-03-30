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
        
        const isSaved = user.savedProjects?.some((pid: any) => pid?.toString() === id?.toString());

        if (isSaved) {
            await User.findByIdAndUpdate(session.user.id, { $pull: { savedProjects: id } });
            await Project.findByIdAndUpdate(id, { $pull: { saves: session.user.id } });
        } else {
            await User.findByIdAndUpdate(session.user.id, { $addToSet: { savedProjects: id } });
            await Project.findByIdAndUpdate(id, { $addToSet: { saves: session.user.id } });
        }

        return NextResponse.json({ success: true, isSaved: !isSaved });
    } catch (error: any) {
        console.error("SAVE API ERROR:", error);
        return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
    }
}
