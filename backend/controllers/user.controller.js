const {User} = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async(req,res)=>{
    try{
        let{name, email, password} = req.body;
        
        if(!name || !email || !password){
            res.status(400).json({
                message:"Some fields are missing"
            })
        }

        const isUserAlreadyExist = await User.findOne({email});
        if(isUserAlreadyExist){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(password,salt);

        //jwt token
        const token = jwt.sign({email}, "supersecret",{expiresIn:'365d'});

        //create user in database
        await User.create({
            name,
            email,
            password:passwordHashed,
            token,
            role:'user'

        })
        res.status(200).json({
            message:"User created Successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const login = async(req,res)=>{
    try{
        let {email,password} = req.body;
        if(!email ||!password){
            return res.status(400).json({
                message:"some fields are missing"
            })
        }

        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                message:"User not Register"
            })
        }
        //compare password
        const isPasswordMatched = bcrypt.compareSync(password,user.password);
        if(!isPasswordMatched){
            res.status(400).json({
                message:"Password wrong"
            })
        }


        res.status(200).json({
            message:"user login successfully",
            id:user._id,
            name:user.name,
            token: user.token,
            email: user.email,
            role: user.role
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports = {signup,login};