const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const User = require('../Schema/userRegisterSchema')
const jwt = require('jsonwebtoken')
dotenv.config()
const jwtToken = process.env.jwt_token
router.post('/', async(req,res) => {
    
    try{
        const email = JSON.stringify(req.body.email)
        const username = JSON.stringify(req.body.username)
        const password = JSON.stringify(req.body.password)
        
        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            bcrypt.hash(password, 10).then(async (hash) => {
              await User.create({
                email: email,
                password: hash,
                username: username,
              }).then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: user._id, username:username, email:email },
                  jwtToken,
                  {
                    expiresIn: maxAge,
                  }
                );
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000,
                });
                res.status(200).send("Register sucessfull");
              });
            });
        } else{
            res.status(400).send({message:"Email already in use!"})
        }
    }catch(err){
        res.status(500).send("an error occured", err)
    }

})

module.exports = router