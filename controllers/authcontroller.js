// we will create the user , verify the user , create and verify the user seesion using jwt
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import {validationResult} from "express-validator"

//  express-validator is middle ware to collect error sin input data or datat that come from client

const signToken=(user)=>{
    return jwt.sign(
        {id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_In

        }
    )
}
export const register=async(req,res)=>{
    try{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
        const {name,email,password}=req.body
        const existuser=await User.findOne({email:email})
        if(existuser){return res.status(400).json({message:"user exits"})}
        const user=new User({name,email,password})
        await user.save()
        const token=signToken(user)


        return res.status(201).json({message:"user is register succesfully",token,user:{id:user._id,name:user.name,email:user.email,role:user.role}})
}
catch(err){
    res.status(500).json({message:err.message})

}
}
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Check email
    const { email, password } = req.body;
    const userexits = await User.findOne({ email });
    if (!userexits) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const correctpass = await userexits.comparePassword(password);
    if (!correctpass) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Sign JWT token
    const token = signToken(userexits);

    // Respond
    res.status(200).json({
      message: "User logged in",
      token,
      user: {
        id: userexits._id,
        email: userexits.email,
        role: userexits.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
