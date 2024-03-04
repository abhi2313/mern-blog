const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'desc is required']
    },
 
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"id  is required for a blog"]
    }
},{timestamps:true})


const blogModel=mongoose.model('Blog',blogSchema)
module.exports=blogModel