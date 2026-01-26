import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads .env into process.env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfully Connected to mongoDB 👍`)
    } catch (error) {
        console.error(`ERROR: ${error?.message}`)
        process.exit(1)
    }
}

export default connectDB
