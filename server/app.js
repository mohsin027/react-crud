const express = require('express')
const app=express()
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const dbConnect = require('./config/dbconnect')
const cors = require('cors')
const cookieParser =require('cookie-parser')
const path =require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({ origin: ["http://localhost:3000", ], credentials: true, }));
app.use(cookieParser());
app.use(express.static(path.resolve()+"/public"))

app.use('/',userRoute)
app.use('/admin',adminRoute)
 
 

dbConnect();  
 



app.listen(4000,()=>{
    console.log('Server running  on http://localhost:4000');
    
})
