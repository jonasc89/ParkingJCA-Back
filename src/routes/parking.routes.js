import { Router } from 'express';
import isAuth from '../middlewares/auth.middleware.js';
import {
  obtenerPlacasActivas,
  createEntry, closeEntry, listEntries, listExits
} from '../controllers/parking.controller.js';

const r=Router();
r.post('/',          isAuth, createEntry);          // POST /api/parkings
r.put('/:id/exit',   isAuth, closeEntry);           // PUT  /api/parkings/5/exit
r.get('/entries',    isAuth, listEntries);          // GET  /entries
r.get('/exits',      isAuth, listExits);            // GET  /exits
r.get('/activas',isAuth, obtenerPlacasActivas);
export default r;
