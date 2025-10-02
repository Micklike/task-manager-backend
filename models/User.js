import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// user schema 
const Userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true})

// create the passwod hashing middelware 

Userschema.pre('save', async function (next){
    if(!this.isModified('password')){ return next()}
    //salt generation
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next()


})


//adding the custom fucntion for comapring passwords by adding the fucntion in userscheam.methods.addmehtod
Userschema.methods.comparePassword=async function (newpass){
  return bcrypt.compare(newpass,this.password)

}

const User=mongoose.model('User',Userschema)
export default User