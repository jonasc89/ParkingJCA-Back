import isAuth from '../middlewares/auth.middleware.js';
import { Router } from 'express';
import {
  deletePersonal,
  updatePersonal,
  createEntry, list
} from '../controllers/registerpersonal.controller.js';

const r=Router();
r.post('/',isAuth, createEntry) ;
r.get('/list', isAuth, list);
r.put('/update/:id',isAuth, updatePersonal);
r.delete('/delete/:id',isAuth, deletePersonal);


export default r;
