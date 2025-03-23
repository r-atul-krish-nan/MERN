const express = require('express')
const app=express();
const EmployeeRoutes=require('./routes/employees-routes')
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error')

//Add BodyParser middleware
app.use(bodyParser.json());

//Each request is taken
app.use('/api/employees',EmployeeRoutes);

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
app.listen(5000)