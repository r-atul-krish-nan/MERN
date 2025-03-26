const express = require('express');
const router = express.Router()
const userControllers = require('../controller/users-controller')

router.get('/',userControllers.getUsers)
router.get('/roles',userControllers.getRoles)
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

module.exports=router; 