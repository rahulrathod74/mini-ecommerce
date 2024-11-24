const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["admin","seller","buyer"]}
})

//hash password before saving
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})

//compare hashed passwords
userSchema.method.comparePwasword=function(password){
    return bcrypt.compare(password,this.password)
}

module.exports=mongoose.model("User",userSchema)