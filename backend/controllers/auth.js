//** IMPORTS */
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//** ACCOUNT */
export const createAccount = async(req , res) =>{
    try{
        const { userName, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        const newUser = new User({
            userName,
            password : hashPass,
        });
        const saveUser = await newUser.save();
        res
          .status(201)
          .json({ user: saveUser, message: "Account Created Successfully!" });
    }catch(error){
        res.status(500).json({error: error.message});
    }
};
//** LOGIN */
export const loginUser = async(req, res) => {
    try{
        const {userName, password} = req.body;
        const user = await User.findOne({ userName: userName});
        if(!user){
            return res.status(400).json({error: "User not Found!"});
        }
        const verifyPass = await bcrypt.compare(password,user.password);
        if(!verifyPass){
            return res.status(401).json({error:"Invalid credentials!"});
        }
        const token = jwt.sign({ id: user._id},process.env.JWT_SECRET,{
            expiresIn:"30d",
        });
        user.password = undefined;
        res.status(200).json({ token, user});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};
//** CHANGE PASSWORD */
export const changePassword = async(req, res)=>{
    const {userName, password, newPassword} = req.body;
    try{
        const user = await User.findOne({ userName : userName});
        if(!user) return res.status(404).json({error: "User not found!"});
        const verfiyPassword = await bcrypt.compare(password, user.password);
        if(!verfiyPassword){
            return res.status(401).json({error:"Invalid Credentials!!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword,salt);
        const newInfo = await User.findByIdAndUpdate(
            {_id: user._id},
            {password: hashPassword},
            {new: true}
        );
        await newInfo.save();
        const newUser = await User.findOne({userName: userName});
        res.status(200).json({user : newUser,message: "password changed successfully."});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}