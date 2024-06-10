import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectDb = async () => {

    let conn;
    try {
        conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database.");

    } catch (err) {
        console.log("Error connecting to db", err);
    }

    return conn;
}