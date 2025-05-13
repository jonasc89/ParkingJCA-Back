import isAuth from '../middlewares/auth.middleware.js';
import { Router } from 'express';
import {
  createEntry, list
} from '../controllers/registerpersonal.controller.js';

const r=Router();
r.post('/',isAuth, createEntry) ;
r.get('/list', isAuth, list);

export default r;
