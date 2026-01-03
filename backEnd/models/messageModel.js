import mongoose from "mongoose";


const messageModel = new mongoose.Schema({
    //We will store the sender if from the user model through refrence
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{timestamps:true})

export const Message = mongoose.model("Message", messageModel);