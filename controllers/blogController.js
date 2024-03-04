const blogModel=require('../models/blogModel')
const userModel = require('../models/userModel')
const mongoose=require('mongoose')

exports.getAllBlogsController=async(req,res)=>{
    try{
        
        const blogs=await blogModel.find({}).populate('user')
        if(!blogs)
        {
            return res.status(200).send({
                success:false,
                message:'No blogs found'
            })
        }
        return res.status(200).send({
            success:true,
            length:blogs.length,
            message:'all blogs fetched successfully',
            blogs
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).send({
            success:false,
            message:'error in getting all blogs',
            err
        })
    }
}

exports.createBlogController=async(req,res)=>{
    try{
    

        const {title,description,user}=req.body
        if(!title || !description ||!user)
        {
            return res.status(400).send({
                success:false,
                message:'all fields are required'
            })
        }
        const existingUser=await userModel.findById(user)
        if(!existingUser)
        {
            return res.status(404).send({
                success:false,
                message:'unable to find user'

            })
        }
        const newBlog=new blogModel({title,description,user})
        const session=await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()
        
        return res.status(201).send({
            success:true,
            message:'blog created successfully',
            newBlog
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).send({
            success:false,
            message:'error in creating blog',
            err
        })
    }

}

exports.updateBlogController=async(req,res)=>{
    try{
    
        const {id}=req.params
        const {title,description}=req.body
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        res.status(200).send({
            success:true,
            message:'blog updated successfully',
            blog

        })


    }
    catch(err)
    {
        console.log(err);
        return res.status(400).send({
            success:false,
            message:'error in updating blog',
            err
        })
    }
}

exports.getBlogController=async(req,res)=>{
    try{
        const {id}=req.params
        
        const blog=await blogModel.findById(id)
        if(!blog)
        {
            return res.status(404).send({
                success:false,
                message:'not any blog with this id '
            })
        }
        return res.status(200).send({
            success:true,
            message:'blogs fetched',
            blog
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).send({
            success:false,
            message:'error in a single blog',
            err
        })
    }

}

exports.deleteBlogController=async(req,res)=>{
    try{
        const {id}=req.params
        const blog=await blogModel.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success:true,
            message:'blog deleted'
        })

    }
    catch(err)
    {
        console.log(err);
        return res.status(400).send({
            success:false,
            message:'error in deleting blog',
            err
        })
    }
}

exports.userBlogController=async (req,res)=>{
    try{
        const userBlogs=await userModel.findById(req.params.id).populate('blogs')
        if(!userBlogs)
        {
            return res.status(404).send({
                success:false,
                message:'blogs not found for this id'
            })
        }
        
        return res.status(200).send({
            success:true,
            message:'user blogs fetched',
            userBlogs
        })

    }
    catch(err)
    {
        console.log(err);
        return res.status(400).send({
            success:false,
            message:'error in getting an user blog',
            err
        })
    }


}
