const express=require('express')
const router=express.Router()
const adminController = require('../controller/adminController')
const upload = require('../multer')

router.post('/adminLogin',adminController.postAdminLogin)

router.get('/userDetails',adminController.getUserDetails)

router.get('/editUser:id',adminController.getUserEditData)

router.post('/postEditUser:id',upload.single('file'),adminController.postUserEditData)

router.get('/deleteUser:id',adminController.deleteUser)

router.get('/adminAuth',adminController.adminCheckAuth)

router.get('/adminLogout',adminController.getAdminLogout)

module.exports=router;