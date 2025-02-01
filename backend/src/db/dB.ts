import mongoose from "mongoose";
import { config } from "dotenv";
config();
export async function connectDb() {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error("Error: CONNECTION_STRING environment variable is not defined.");
        return;
    }
    try {
        // console.log(connectionString);
        await mongoose.connect(connectionString);
        console.log("db connected");
    } catch (error) {
        console.log({message : "error in dB connection" , error});
    }
}