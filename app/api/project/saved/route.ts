import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuth";
import "@/models/project.model"; // ensure project model is registered for populate

export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const user = await User.findById(session.user.id).populate({
            path: 'savedProjects',
            populate: { path: 'author', select: 'username fullName email avatarUrl avatar' }
        });
        
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        
        return NextResponse.json({ success: true, projects: user.savedProjects || [] });
    } catch (error) {
        console.error("FETCH SAVED ERROR", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
