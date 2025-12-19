import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'  // to use .env variables
import bcrypt from 'bcrypt'; // for hashing password
import { nanoid } from 'nanoid'; // for generating unique ids like for username(prasanna@gmail.com -> prasanna+nanoid , prasanna@yahoo.com -> prasanna+nanoid)
import jwt from 'jsonwebtoken';


const server = express();

//schema
import User from './Schema/User.js';// import User schema
let PORT = 3000;

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION,{
    autoIndex:true
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const formatDatatoSend = (user) => {
    const accesstoken =jwt.sign(
        {id: user._id}, process.env.SECRET_ACCESS_KEY,
    )
    return {
        accesstoken,
          profile_img: user.personal_info.profile_img,
            fullname: user.personal_info.fullname,
            username: user.personal_info.username
            }
}




const generateUsername = async (email) => {
    let username = email.split("@")[0];
    let isUsernameNotUnique =await User.exists({"personal_info.username":username}).then((result)=>result);
    isUsernameNotUnique ? username += nanoid().substring(0,5) : "";
    return username;
}

server.post("/signup",(req,res)=>{
    // res.json(req.body);
    let {fullname,email,password} = req.body;
    if(fullname.length < 3){
        return res.status(400).json({"error":"Fullname must be at least 3 characters long"});
    }
    
    if(!email.length){
        return res.status(403).json({"error":"Email is required"});
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error":"Invalid email format"});
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"error":"Password must be 6 to 20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter"});
    }
    bcrypt.hash(password,10, async (err, hashed_Password) => {
        // let username =email.split("@")[0];
        let username = await generateUsername(email);
        let user = new User({
            personal_info:{
                fullname,
                email,
                password:hashed_Password,
                username
            }
        })// create new user
        user.save().then((u)=>
        {
            return res.status(200).json(formatDatatoSend(u));
        })
        .catch(err => {
            if(err.code === 11000){// duplicate key error here for unique fields
                return res.status(500).json({"error":"User with this email already exists"});
            }
            return res.status(500).json({"error":err.message});
        })// to save in database
        })
});

server.post("/signin",(req,res)=>{
    let { email,password} = req.body;
    User.findOne({"personal_info.email": email})
    .then((user)=>{
        if(!user){
            return  res.status(403).json({"error":"Email not found"})
        }
        bcrypt.compare(password,user.personal_info.password,(err,result) => {
            if(err){
                return res.status(403).json({"error": "Erros occured while login please try again"});
            }
            if(result){
                return res.status(403).json({"error": "incorrect password"});

            }else{
                return res.status(200).json(formatDatatoSend(user))
            }
        })
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({"error":"err.message"})
    })
}
)
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});