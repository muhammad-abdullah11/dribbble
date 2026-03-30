import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { User } from "@/models/user.model";
import { sendMail } from "@/utils/sendMail";



export const POST = async (req: NextRequest) => {
    try {
        const { fullName, username, email, password } = await req.json();

        if (!fullName || !username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const newUser = await User.create({ fullName, username, email, password });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        newUser.forgetOtp = otp;
        newUser.forgetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await newUser.save();
        await sendMail({ to: email, subject: "Verify your email", text: `Your OTP is ${otp}` });
        const userObj = await User.findById(newUser._id).select("fullName username email isVerified");
        return NextResponse.json({ message: "User created successfully and OTP sent to your email", user: userObj }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "User creation failed", error: error.message }, { status: 500 });
    }
}