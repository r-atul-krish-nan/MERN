const e= require('express');
const HttpError = require('../models/http-error')
const {validationResult}=require('express-validator');
const Employee = require('../models/Employee');
const mongoose = require('mongoose')
DUMMY_EMPLOYEES = [
    {
        "EmployeeId": 1,
        "EmployeeName":"Atul",
        "Designation":"SE",
        "JoinDate":"22-03-2025",
        "DeptID":2,
        "Certificates":[1,2],
        "PhNum":"7994658292",
        "IsActive":true
    }
]
/*
constgetEmployeeId.get('(req,res,next)=>{
    console.log("GET REQUEST in progress");
    const EmployeeId=parseInt(req.params.empid);
    const Employee=DUMMY_EMPLOYEES.find(p=>{
        return p.EmployeeId === EmployeeId;
    })
        */

const getEmployeeById = async (req,res,next)=>{
    console.log("GET REQUEST in progress");
    const EmployeeId =req.params.empid;
    // const Employee = DUMMY_EMPLOYEES.find(p=>{
    //     return p.EmployeeId === EmployeeId;
    // })
    //check if the employee exists in atlas
    let employee;
    try {
        employee = await Employee.findById(EmployeeId);
        console.log(employee)
    }catch (err){
        console.log(err);
        return next(new 
            HttpError('Something went wrong, could not find the employee',500))
    }
     
    if(!Employee){
        // const error = new Error
        // ('Could not find a employee for the id')
        // error.code = 404;
        // throw error;//throw error will trigger
        //             //error handling middleware
        throw new HttpError
        ('Could not find a employee for the id',404)
    }
    res.json({employee: employee.toObject({getters: true})})
}

//Add Employee
const createEmployee = async(req,res,next)=>{

    //handle validation logic here..
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError(errors.array().map(err=>err.msg).join(','),422)
    }
    //Extract employee details from request body
    const  {EmployeeName,
            Designation,
            JoinDate,
            DeptID,
            Certificates,
            PhNum,
            IsActive}=req.body
        const createdEmployee=new Employee({
            EmployeeName:EmployeeName,
            Designation:Designation,
            JoinDate:JoinDate,
            DeptID:DeptID,
            Certificates:Certificates,
            PhNum:PhNum,
            IsActive:IsActive
        })
    //add to dummy data
    //DUMMY_EMPLOYEES.push(createdEmployee);
    try{
        await createdEmployee.save();
    }catch(err){
        console.log(err)
        return next(new HttpError('Creating Employee Failed',500))
    }
    res.status(201).json({employee: createdEmployee})
}



const updateEmployee = async(req,res,next)=>{
    const{Designation,PhNum} = req.body;
    const EmployeeId = req.params.empid;
    //find the index of the employee 
    // const employeeIndex=DUMMY_EMPLOYEES.findIndex(emp => emp.EmployeeId ===EmployeeId)
    // if(employeeIndex ===-1){
    //     return res.status(404).json({message: "Employee not found"})
    // }
    // //create copy of existing field
    // //update field
    // const updatedEmployee = {...DUMMY_EMPLOYEES[employeeIndex]};
    // if(Designation) updatedEmployee.Designation=Designation;
    // if(PhNum) updatedEmployee.PhNum=PhNum;
    // console.log(updatedEmployee);

    // //Replace the old record with the updated one
    // DUMMY_EMPLOYEES[employeeIndex]=updatedEmployee;


    //validate if employeeId is a valid mongoDB object
    if(!mongoose.Types.ObjectId.isValid(EmployeeId)){
        return next(new HttpError('Invalid Employee ID',400))
    }
    let employee;
    try{
        employee = await Employee.findById(EmployeeId);
        if(!employee){
            return next(new HttpError('Employee not Fount',404))
        }
    }catch(err){
        return next (new HttpError('Something Went Wrong, Could not update Employee'))
    }
    //Update only the required fields
    if(Designation)employee.Designation=Designation;
    if(PhNum)employee.PhNum=PhNum;
    try {
        await employee.save();
    }catch(err){
        return next(new HttpError('Something went wrong',500))
    }
    res.status(200).json({employee:employee.toObject({getters:true})})
}


const deleteEmployee = async (req,res,next)=>{
    const EmployeeId = req.params.empid;
    //validate if employeeId is a valid mongoDB object
    if(!mongoose.Types.ObjectId.isValid(EmployeeId)){
        return next(new HttpError
            ('Invalid Employee ID',400))
    }
    let employee;
    try {
        employee = await Employee.findById(EmployeeId);
        if(!employee){
            return next(new HttpError
                ('Employee not found',404))
        }
    }catch (err){
        return next(new HttpError
            ('Something went wrong, could not delete employee',500))
    }
    try {
        await employee.deleteOne();
    }catch(err){
        return next(new HttpError('Something went wrong',500))
    }
    
    res.status(200).json({message:"Deleted Employee" })
};
exports.getEmployeeById = getEmployeeById;
exports.createEmployee = createEmployee;
exports.updateEmployee= updateEmployee;
exports.deleteEmployee= deleteEmployee;