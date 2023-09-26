const express = require('express')
const router = express.Router()
const User = require('../Schema/userRegisterSchema')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()
const jwtToken = process.env.jwt_token
router.post('/', async(req,res) => {
    const email = JSON.stringify(req.body.email)
    const password = JSON.stringify(req.body.password)
    if(!email || !password){
        res.status(401).send({Message:"email and password both should be provided!!"})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            res.send({message:"Email has not been registered!"})
        }
        else{
            bcrypt.compare(password, user.password).then((result) => {
                if(result){
                    const maxAge = 3 * 60 * 60
                    const token = jwt.sign(
                        {id:user._id, email},
                        jwtToken,
                        {expiresIn:maxAge}
                    )
                    res.cookie("jwt", token, {
                      httpOnly: true,
                      maxAge: maxAge * 1000,
                    });
                    res.status(201).json({message:"User logged in sucessfully", username:user.username, email:user.email})
                }
                else{
                    res.status(404).json({message:"Incorrect email or password"})
                }
            })

        }

    } catch(err){
        res.send(err)
    }
    
})

module.exports = router