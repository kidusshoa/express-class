import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected:", conn.connection.host);
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}