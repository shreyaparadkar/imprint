const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../DB/models/user.model");
const validateSignupData = require('../../validator/signup');

const key = process.env.KEY;

router.post('/',(req,res)=>{
    const { name, email, password } = req.body;
    const { errors, isValid } = validateSignupData(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email })
    .then(user=>{
        if(!user){
            let userTemp = {};
            userTemp.name = name;
            userTemp.email = email;
            userTemp.password = bcrypt.hashSync(password, 10);
            let userModel = new User(userTemp);
            userModel.save();
            jwt.sign(
                {
                    name: name
                },
                key,
                { expiresIn: 86400 },
                function (err, token) {
                    res.status(200).json({ token });
                }
            );
        }
        else{
            res.status(400).json({"msg":"User already exists"})
        }
    })
    .catch(err=>console.log(err))
    
})

module.exports = router;