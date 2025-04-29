import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import 'dotenv/config';

export async function register(req,res,next){
  try{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json(errors.array());
    const {name,email,password}=req.body;
    if(await User.findOne({where:{email}}))
      return res.status(409).json({msg:'Ya existe'});
    const u=await User.create({name,email,password});
    res.status(201).json({id:u.id,email});
  }catch(err){next(err);}
}

export async function login(req,res,next){
  try{
    const {email,password}=req.body;
    const u=await User.findOne({where:{email}});
    if(!u||!(await u.validPassword(password)))
      return res.status(401).json({msg:'Credenciales inválidas'});
    const token=jwt.sign({id:u.id,email:u.email},
      process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    res.json({token});
  }catch(err){next(err);}
}