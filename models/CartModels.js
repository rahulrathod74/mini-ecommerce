const mongoose=require("mongoose")

const cartSchema=new mongoose.Schema({
    buyerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    products:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
            quantity:{type:Number,required:true},
        }
    ],
    totalCartValue:{type:Number,default:0}
})

//Update totalcartvalue whenever  products are updated
cartSchema.pre("save",function(next){
    this.totalCartValue=this.products.reduce((total,item)=>total+item.quantity* item.productId.price,0)
    next()
})

module.exports=mongoose.model("Cart",cartSchema)