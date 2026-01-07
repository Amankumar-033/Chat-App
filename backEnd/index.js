import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
dotenv.config({});


//Middleware for parsing json string to req.body....
app.use(express.json());

//middleware to allow cross origin request...
app.use(cors({
    origin: "http://localhost:3000",  
    credentials: true              
}));

//middleware to allow parsing from cookie from client side in server middleware logic
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//Routes...
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);


server.listen(PORT, () => {
    connectDB();
    console.log(`Welcome to my server ${PORT}`);
})