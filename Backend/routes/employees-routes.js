const express = require('express')
const router = express.Router() //gives router object
const employeeController = require('../controller/employee-controller')

const {check} = require('express-validator');

router.get('/:empid',employeeController.getEmployeeById)
router.post('/',[check('EmployeeName').not().isEmpty().withMessage('Name is required'),
    check('JoinDate').isISO8601().withMessage('Date if Joining must be valid date (YYYY-MM-DD)'),
    check('PhNum').isLength({min:10,max:10}).withMessage('Contact Number must be exactly 10 digits').isNumeric().withMessage('Contact Number must contain only numbers')],
    employeeController.createEmployee)
    router.patch('/:empid',employeeController.updateEmployee)
    router.delete('/:empid',employeeController.deleteEmployee)
module.exports=router;