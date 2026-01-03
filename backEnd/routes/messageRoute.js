import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const messageRouter = express.Router();
messageRouter.route("/send/:id").post(isAuthenticated, sendMessage);
messageRouter.route("/:id").get(isAuthenticated, getMessage);

export default messageRouter;