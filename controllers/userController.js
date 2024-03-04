const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')

exports.getAllUsers = async(req,res) => {
    try{
        const users=await userModel.find()
        return res.status(200).send({
            total_users:users.length,
            success:true,
            users,
            

        })

    }
    catch(err){
        
        console.log(err)
        return res.status(500).send({
            message:"error in get-all-users",
            success:false
        })

    }
};

exports.registerController = async(req,res) => {
    try{
        
        const{username,email,password}=req.body
        if (!username || !email || !password)
        {
            return res.status(500).send({
                message:"all fields are required",
                success:false
            })

        }
        // existing user
        const existingUser=await userModel.findOne({email})
        if(existingUser)
        {
            return res.status(401).send({
                message:"user already exists",
                success:false
            })
        }

        const hashed=await bcrypt.hash(password,10)
        

        const user=new userModel({username,email,password:hashed})
        await user.save()
        return res.status(201).send({
            message:"user created successfully",
            user,
            success:true
        })

    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({
            message:"error in register",
            success:false
        })
    }
};

exports.loginController = async(req,res) => {
    try{
        
        
        const {email,password}=req.body
        if ( !email || !password)
        {
            return res.status(500).send({
                message:"all fields are required",
                success:false
            })

        }
        const user=await userModel.findOne({email})
        if(!user)
        {
            
            return res.status(500).send({
                message:"email not registered",
                success:false
            })

        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
              
            return res.status(500).send({
                message:"invalid username or password",
                success:false
            })
            

        }
        return res.status(200).send({
            success:true,
            message:"logged in successfully",
            user


        })
        
        }

    
    catch(err)
    {
        
        console.log(err)
        return res.status(500).send({
            message:"error in register",
            success:false
        })

    }
};
