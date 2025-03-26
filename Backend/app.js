const express = require('express')
const app=express();
const EmployeeRoutes=require('./routes/employees-routes')
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error')
const UsersRoutes = require('./routes/users-routes')
const mongoose = require('mongoose')
require('dotenv').config();

//Add BodyParser middleware
app.use(bodyParser.json());

//Each request is taken
app.use('/api/employees',EmployeeRoutes);

//each request is taken by each function
app.use('/api/employees',EmployeeRoutes);
app.use('/api/users',UsersRoutes)

//middleware to handle unmatched routess
app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route',404);
    throw error;
})

//middleware for error handling
app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message} || "An unknown error")
})
// mongoose.connect('mongodb+srv://ratulkrishnan2005:MSDhoni7014@cluster0.bpjl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
//     app.listen(5000);
// }).catch(err=>{
//     console.log(err)
// })
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to atlas")
    app.listen(5000)
}).catch(err=>{
    console.error("Database Connection failed:",err)
})