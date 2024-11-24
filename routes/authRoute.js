const express=require("express")
const jwt=require("jsonwebtoken")
const User=require("../models/UserModels")
const blacklist=require("../blacklist/index")

const router=express.Router()

router.post("/register",async(req,res)=>{
    try {
        const {email,password,role}=req.body
        const user=new User({email,password,role})
        await user.save()
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.post("/login",async(req,res)=>{
try {
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15m"})
    const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    res.json({token,refreshToken})
} catch (error) {
    res.status(400).json({message:error.message})
}
})

router.post("/logout",(rq,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token) blacklist.add(token)
        res.status(200).json({message:"Logged out succeessfully"})
})

module.exports=router