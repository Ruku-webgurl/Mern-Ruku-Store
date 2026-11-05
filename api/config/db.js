import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables. Please check your .env file.");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully Connected to mongoDB 👍`);
    } catch (error) {
        console.error(`Mongodb connection fail: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
