//create employee schema here
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    EmployeeName:{type: String, required: true,},
    Designation: {type:String,required:true},
    JoinDate:{type: Date,required:true},
    DeptID:{type:Number,required:true},
    Certificates:[{type:Number,required:true}],
    PhNum:{type:String,required:true,length:10},
    Isactive:{type:Boolean,default:true}
})

module.exports=mongoose.model('Employee',employeeSchema)