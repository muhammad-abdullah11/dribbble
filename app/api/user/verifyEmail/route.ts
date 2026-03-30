import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { User } from "@/models/user.model";

export const POST = async (req: NextRequest) => {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.forgetOtp !== otp) {
            return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
        }

        if (user.forgetOtpExpiry < new Date()) {
            return NextResponse.json({ message: "OTP expired" }, { status: 400 });
        }

        user.isVerified = true;
        user.forgetOtp = "";
        user.forgetOtpExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Email verification failed", error: error.message }, { status: 500 });
    }
}