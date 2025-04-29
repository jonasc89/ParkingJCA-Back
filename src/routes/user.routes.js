import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware.js';
import { deleteUser } from '../controllers/user.controller.js';

const r=Router();
r.delete('/:id', isAuth, deleteUser);
export default r;
