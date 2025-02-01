import mongoose from "mongoose";

interface user {
    email : string,
    password : string,
}

const UserSchema = new mongoose.Schema<user>({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

export const User = mongoose.model<user>("User" , UserSchema);