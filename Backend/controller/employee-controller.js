const e= require('express');
const HttpError = require('../models/http-error')
DUMMY_EMPLOYEES = [
    {
        "EmployeeId": 1,
        "EmployeeName":"Atul",
        "Designation":"Student",
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

const getEmployeeById = (req,res,next)=>{
    console.log("GET REQUEST in progress");
    const EmployeeId=parseInt(req.params.empid);
    const Employee=DUMMY_EMPLOYEES.find(p=>{
        return p.EmployeeId === EmployeeId;
    })

    if(!Employee){
         /*
        const error = new Error
        ('Could not find an Employee for the Id')
        error.code = 404;
        throw error  //throw error will trigger
                    //error handling middleware
        */
        throw new HttpError
        ('Could not find Employee for the id',404)
    }

    res.json({Employee})
}

//Add Employee
const createEmployee = (req,res,next)=>{
    //Extract employee details from request body
    const  {EmployeeName,
            Designation,
            JoinDate,
            DeptID,
            Certificates,
            PhNum,
            IsActive}=req.body
        const createEmployee={
            EmployeeName:EmployeeName,
            Designation:Designation,
            JoinDate:JoinDate,
            DeptID:DeptID,
            Certificates:Certificates,
            PhNum:PhNum,
            IsActive:IsActive
        }
    //add to dummy data
    DUMMY_EMPLOYEES.push(createEmployee);
    res.status(201).json({employee: createEmployee})
}

const updateEmployee = (req,res,next)=>{
    const{Designation,PhNum} = req.body;
    const EmployeeId = parseInt(req.params.empid);
    //find the index of the employee 
    const employeeIndex=DUMMY_EMPLOYEES.findIndex(emp => emp.EmployeeId ===EmployeeId)
    if(employeeIndex ===-1){
        return res.status(404).json({message: "Employee not found"})
    }
    //create copy of existing field
    //update field
    const updatedEmployee = {...DUMMY_EMPLOYEES[employeeIndex]};
    if(Designation) updateEmployee.Designation=Designation;
    if(PhNum) updateEmployee.PhNum=PhNum;

    //Replace the old record with the updated one
    DUMMY_EMPLOYEES[employeeIndex]=updateEmployee;
    res.status(200).json({employee:updatedEmployee})
}
exports.getEmployeeById = getEmployeeById;
exports.createEmployee = createEmployee;