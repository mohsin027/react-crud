const userModel=require('../model/userModel')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')

module.exports={
    postSignup:async(req,res)=>{
        try {
            console.log(req.body);
        let {name,email,password}=req.body;
        const oldUser=await userModel.findOne({email})
        if(oldUser){
            res.json({err:true,message:'User already exsist'})
        }else{
            let bcrypPassword=await bcrypt.hash(password,10)
            let user= await userModel.create({
                name,
                email,
                password:bcrypPassword
            });
             
            console.log(user);
            const token=jwt.sign({
                id:user._id
            },
            "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
            console.log(token);
            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'User registration success'});
            
           
        }
        } catch (error) {
            console.log(error);
        }
        
    },
    postLogin:async(req,res)=>{
        let {email,password}=req.body;
        let user=await userModel.findOne({email:email})
        if(user){
            let status= await bcrypt.compare(password,user.password)
            if(status){
                const token=jwt.sign({
                    id:user._id
                },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'User login success'}); 
            }else{
                res.json({err:true,message:"Invalid email or password"})
            }
        }else{
            res.json({err:true,message:'No user found, please signup.'})
        }
    },
    getLogout:(req,res)=>{
        return res.cookie("token", '', {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false ,message:'Logged out successfully'}); 
    },

    checkAuth:async(req,res)=>{
       const token = req.cookies.token;
       if(token){
       const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
       const user=await userModel.findById(verifyJwt.id,{password:0})
       res.json({logged:true,details:user})
       }else{
        res.json({logged:false,err:true,message:'No token'})
       }
    },
    editProfile:async(req,res)=>{
        await userModel.updateMany({_id:req.body.id},{$set:{
            name:req.body.name,
            image:req.file
        }}).then((result)=>{
            res.json({result,err:false,message:'profile updated'})
        }).catch(err=>{
            console.log(err);
            res.json({err:true,message:'error occured'})
        })
    }
}