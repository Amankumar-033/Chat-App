import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


//sign up for register logic...
export const SignUp = async(req, res) => {
    try{
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        
        //if some field are missing..
        if(!fullName ||!userName || !password || !confirmPassword || !gender)
            return res.status(400).json({message: "All fields are important"});

        //if password is not matched with actual password...
        if(password !== confirmPassword)
            return res.status(400).json({message: "Password do not match.."})
        
        //checking if any user with this username already exist..
        const user = await User.findOne({userName});

        if(user)
            return res.status(400).json({message: "userName already exist, Try different..."})

        //Hashing the password...
        const hashedPassword = await bcrypt.hash(password, 10);

        //Picking random avatar as profilePhoto for boy/girl...
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?${userName}`;
        
        //Now creating/registering a new user...
        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto: gender == "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })

        res.send({success: true, message: "Acount created successfully"});
    }
    catch(error){
        console.error("Error in SignUp:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}



export const login = async (req, res) => {
    try{
        console.log(req.body);
        const {userName, password} = req.body;

        if(!userName || !password)
            return res.status(400).json({message: "All fields are important"});

        //Checking if this user exist in database or not...
        const user = await User.findOne({userName});


        //if the user doesnt exist...
        if(!user)
            return res.status(400).json({success: false, message: "Incorrect username or password"});

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched)
            return res.status(400).json({success: false, message: "Incorrect username or password"});

        const tokenData = {
            userId: user._id,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        return res.status(200).cookie("token" , token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            success: true,
            message: `Welcome back ${user.fullName}`
        });
    }
    catch(error){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "logged out successfully"
        })
    }
    catch(error){
        console.log(error.message);
    }
}

export const getOtherUsers = async (req, res) => {
    try{
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }
    catch(error){
        console.log(error);
    }
}
