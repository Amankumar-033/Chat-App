import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Database connected successfully");
        })
    }
    catch(error){
        console.log(`Error: ${error.message}`)
    }
}