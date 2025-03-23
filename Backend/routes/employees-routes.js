const express = require('express')
const router = express.Router() //gives router object
const employeeController = require('../controller/employee-controller')

router.get('/:empid',employeeController.getEmployeeById)
router.post('/:',employeeController.createEmployee)
router.patch('/:empid',employeeController.getEmployeeById)
module.exports=router;