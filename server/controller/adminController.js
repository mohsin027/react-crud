const { response } = require('express');
const adminModel= require('../model/adminModel')
const jwt =require('jsonwebtoken');
const userModel = require('../model/userModel');
module.exports={
postAdminLogin:async(req,res)=>{
    try {
      
        const admin=await adminModel.findOne({email:req.body.email})
        if(admin){
            if(req.body.password==admin.password){
                const token=jwt.sign({id:admin._id},'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
                 return res.cookie("Admintoken", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({err:false,message:'admin login success'})
            }else{
                res.json({err:true,message:'Invalid username or password'})
            }
        }else{
            res.json({err:true,message:'No admin exsist'})
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
   
},
getUserDetails:async (req,res)=>{
    try {
        const user=await userModel.find({ name:new RegExp(req.query.search, 'i')}, {password:0}).lean();
        if(user.length ?? 1 !=0){
            res.json({user,err:false,message:'data found'})
        }else{
            res.json({err:true,message:'No data found'})
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
   
},
getUserEditData:async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.params.id},{password:0})
        res.json({user,err:false})
    } catch (error) {
        console.log(error);
        res.json({error,err:true})
    }
   
},
postUserEditData:async(req,res)=>{
    try {
        if(req.file){
            const updateUser= await userModel.updateOne({_id:req.params.id},{$set:{
                name:req.body.name,
                email:req.body.email,
                image:req.file
            }})
            res.json({updateUser,err:false})
        }else{
            const updateUser= await userModel.updateOne({_id:req.params.id},{$set:{
                name:req.body.name,
                email:req.body.email
            }})
            res.json({updateUser,err:false})
        }
    } catch (error) {
        console.log(error);
        res.json({error,err:true})
    }

},
deleteUser:async(req,res)=>{
try {
    console.log(req.params.id);
    await userModel.deleteOne({_id:req.params.id}).then((result)=>{
        return res.cookie("token", '', {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ result, err: false ,message:'Logged out successfully'}); 
       
    })
} catch (error) {
    console.log(error);
    res.json(error)
}
},
adminCheckAuth:async(req,res)=>{
    const token = req.cookies.Admintoken;
    if(token){
    const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
    const user=await userModel.find({})
    res.json({logged:true,details:user})
    }else{
     res.json({logged:false,err:true,message:'No token'})
    }
 },
 getAdminLogout:(req,res)=>{
    return res.cookie("Admintoken", '', {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
    }).json({ err: false ,message:' Admin logged out successfully'}); 
}
}                                                           