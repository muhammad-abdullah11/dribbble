import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { Project } from "@/models/project.model";
import { User } from "@/models/user.model";

export async function GET() {
    try {
        await dbConnect();
        
        // Force fully inject arrays onto every previous User
        await User.collection.updateMany(
            { $or: [{ likedProjects: { $exists: false } }, { savedProjects: { $exists: false } }] },
            { $set: { likedProjects: [], savedProjects: [] } }
        );

        // Wipe out the old number types on old Projects and forcefully replace with empty schema Arrays
        await Project.collection.updateMany(
            { $or: [{ likes: { $type: "number" } }, { views: { $type: "number" } }, { likes: { $exists: false } }] },
            { $set: { likes: [], views: [] } }
        );

        return NextResponse.json({ success: true, message: "Successfully migrated all previous users and projects!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Migration failed" }, { status: 500 });
    }
}
