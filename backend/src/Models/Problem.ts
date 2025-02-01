import mongoose, { Document, Mongoose } from "mongoose";

type difficultyType = "easy" | "medium" | "hard";

interface problem extends Document {
    number : number,
    title : string,
    difficulty : difficultyType,
    code : string[],
    desciption : string,
    notes : string,
    tags : string[],
    user : mongoose.Schema.Types.ObjectId, 
}

const problemSchema = new mongoose.Schema({
    number :{
        type : Number,
        required : true,
    } ,
    title :{
        type : String,
        required : true,
    } ,
    difficulty :{
        type : String,
        enum : ["easy" , "medium" , "hard"],
        required : true,
    } ,
    code :{
        type : [],
        required : true,
    } ,
    description :{
        type : String,
        required : true,
    } ,
    notes :{
        type : String,
        required : true,
    },
    tags :{
        type : [],
        required : true,
    } ,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    }
})

export const Problem = mongoose.model<problem>("Problem" , problemSchema);