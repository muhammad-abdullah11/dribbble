import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    avatarUrl: {
        type: String,
    },
    forgetOtp: {
        type: String,
    },
    forgetOtpExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    likedProjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    savedProjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]

}, { timestamps: true })

UserSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.models.User || mongoose.model("User", UserSchema);