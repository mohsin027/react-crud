const express=require('express')
const router=express.Router()
const userController= require('../controller/userController')
const upload = require('../multer')


router.post('/signup',userController.postSignup)

router.post('/login',userController.postLogin)

router.get('/logout',userController.getLogout)

router.get('/checkAuth',userController.checkAuth)

router.post('/editProfile',upload.single('file'),userController.editProfile)

module.exports=router;