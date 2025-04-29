import { ParkingRecord } from '../models/parkingrecord.js';
import { Op } from 'sequelize';

export async function createEntry(req,res,next){
  try{
    const record = await ParkingRecord.create({
      plate: req.body.plate,
      userId: req.user.id           // dueño de la acción
    });
    res.status(201).json(record);
  }catch(err){next(err);}
}

export async function closeEntry(req,res,next){
  try{
    const record = await ParkingRecord.findByPk(req.params.id);
    if(!record) return res.status(404).json({msg:'No existe'});
    record.exitTime = new Date();
    await record.save();
    res.json(record);
  }catch(err){next(err);}
}

export async function listEntries(_req,res,next){
  try{
    const data = await ParkingRecord.findAll({ where:{ exitTime:null } });
    res.json(data);
  }catch(err){next(err);}
}

export async function listExits(_req,res,next){
  try{
    const data = await ParkingRecord.findAll({
      where:{ exitTime:{ [Op.ne]: null } }
    });
    res.json(data);
  }catch(err){next(err);}
}
