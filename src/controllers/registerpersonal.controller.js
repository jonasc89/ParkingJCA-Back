import { RegisterPersonal } from '../models/registerpersonal.js';
import { Op } from 'sequelize';

export async function createEntry(req,res,next){
  try{
    const record = await RegisterPersonal.create({
      name: req.body.name,
      position: req.body.position,
      dateRegister: req.body.dateRegister,
    });
    res.status(201).json(record);
  }catch(err){next(err);}
}
export async function list(_req,res,next){
  try{
    
const data = await RegisterPersonal.findAll({where: {name: {[Op.not]: null}}
});
    res.json(data);
  }catch(err){next(err);}
}
