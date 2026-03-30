import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { User } from "@/models/user.model";
import { sendMail } from "@/utils/sendMail";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.forgetOtp = otp;
        user.forgetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendMail({ to: email, subject: "Verify your email", text: `Your new OTP is ${otp}` });

        return NextResponse.json({ message: "OTP resent successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Failed to resend OTP", error: error.message }, { status: 500 });
    }
}
