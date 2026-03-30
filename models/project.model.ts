import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
        required: [true, "Image URL is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    githubUrl: {
        type: String,
    },
    liveUrl: {
        type: String,
    },
    tags: {
        type: [String],
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
    },

}, { timestamps: true })

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);