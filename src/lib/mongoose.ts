"use server"
import mongoose from "mongoose";
// singleton connection
let isConnected: boolean = false; // track the connection status
export const connectToDatabase = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "ucademy"
        });
        isConnected = true; 
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");    
    }
}