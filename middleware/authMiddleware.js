const jwt=require('jsonwebtoken')
const User=require("../models/UserModels")

const authenticate=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split("")[1]
        if(!token) return res.status(401).json({message:"No token provided"})
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decoded.id)
        if(!req.user) return res.status(401).json({message:"Invalid token"})

            next()
        } catch (error) {
        res.status(401).json({message:"unauthorized"})
    }
}

const authorize=(roles)=>(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(403).json({message:"Forbidden"})
    }
    next()
}

module.exports={authenticate,authorize}