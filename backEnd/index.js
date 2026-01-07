import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
dotenv.config({});
import path from "path";

const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
    // Backend frontend ke dist folder ko serve karega
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // Kisi bhi route par React ka index.html bhejega
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


server.listen(PORT, () => {
    connectDB();
    console.log(`Welcome to my server ${PORT}`);
})