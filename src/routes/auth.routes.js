import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller.js';
const r=Router();
r.post('/register',
  body('email').isEmail(), body('password').isLength({min:5}), register);
r.post('/login',
  body('email').isEmail(), body('password').notEmpty(), login);
export default r;
