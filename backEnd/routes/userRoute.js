import express from "express";
import { SignUp, login, logout, getOtherUsers } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRouter = express.Router();

userRouter.route("/signUp").post(SignUp);
//or userRouter.post("/signUp", signUp);
// but for this u need to redirect your path from main index.js to this page
// like app.use("/users", userRoute);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);

//For other users showing on home
userRouter.route("/").get(isAuthenticated, getOtherUsers);

export default userRouter;