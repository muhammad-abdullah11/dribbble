import mongoose from "mongoose";

const dbConnect = async () => {
    const mongoUrL = process.env.MONGO_URI;
    if (!mongoUrL) {
        throw new Error("Please provide MongoDB URL");
    }
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected");
            return;
        }
        await mongoose.connect(mongoUrL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;