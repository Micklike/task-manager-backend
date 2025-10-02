import express from "express"
import { register,login } from "../controllers/authcontroller.js"
import {body} from 'express-validator'
const router=express.Router()
const registerValidation=[
    body('name').notEmpty().withMessage('Name Required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({min:6}).withMessage("password min 6 chars")
]
const loginValidation=[
    body('email').isEmail().withMessage("enter valid email address"),
    body('password').notEmpty().withMessage("password required")
]
router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)


export default router


