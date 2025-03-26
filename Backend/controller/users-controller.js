const HttpError = require("../models/http-error")


const DUMMY_ROLES = [
    { id: 'r1', roleName: 'Admin' },
    { id: 'r2', roleName: 'Staff' },
]
const DUMMY_USER = [
    {
        id : 'u1',
        name: 'Atul',
        email: 'atulkrish@gmail.com',
        password: 'atul1234',
        roleId: 'r1'
    }
]


const getUsers = (req,res,next)=>{
    //get all users
    res.json({users: DUMMY_USER})

}
const getRoles = (req,res,next)=>{
    res.json({roles: DUMMY_ROLES})
}
const signup = (req,res,next)=>{
    const {name, email, password,roleId} = req.body;
    //check if email already exists
    const existingUser = 
    DUMMY_USER.find(u =>u.email ===email);
    if(existingUser){
        return next(new HttpError
            ('Email already Exists!',422))
    }
    //Check if roleId  is valid
    const roleExists = DUMMY_ROLES.find(r=>r.id ===roleId);
    if(!roleExists){
        return next(new HttpError
            ('Invalid Role ID',400))
    }
    const createdUser = {
        id:1001,
        name,
        email,
        password,
        roleId
    };
    DUMMY_USER.push(createdUser);
    res.status(201).json({user: createdUser})

}

const login = (req,res,next)=>{
    const {email, password} = req.body;
    const identifiedUser = 
    DUMMY_USER.find(u=>u.email===email);
    if(!identifiedUser || identifiedUser.password !== 
        password){
            return next(new HttpError
                ('Wrong credentials',401))
        }
    res.json({message: 'Logged In!', user:identifiedUser});

}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getRoles = getRoles;