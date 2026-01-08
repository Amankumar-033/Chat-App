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
//middleware to allow cross origin request...
const corsOptions = {
    // 👇 YAHAN ASLI URL DAALO (Jo tumhara live link hai)
    origin: process.env.NODE_ENV === "production" 
        ? "https://chat-app-c21m.onrender.com" 
        : "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};


app.use(cors(corsOptions))
app.use(cors(corsOptions))

//middleware to allow parsing from cookie from client side in server middleware logic
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//Routes.. aman.
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
};


server.listen(PORT, () => {
    connectDB();
    console.log(`Welcome to my server ${PORT}`);
})