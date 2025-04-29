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

export async function closeEntry(req, res, next) {
  try {
    // 1) Busca el registro existente
    const record = await ParkingRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ msg: 'Registro no encontrado' });

    // 2) Asigna la hora de salida
    const exit = new Date();
    record.exitTime = exit;

    // 3) Calcula la diferencia en milisegundos
    const diffMs = exit - record.entryTime; 
    // 4) Convierte a horas y redondea hacia arriba
    const hours = Math.ceil(diffMs / (1000 * 60 * 60));
    record.durationHours = hours;

    // 5) Guarda los cambios
    await record.save();

    // 6) Devuelve el registro actualizado
    res.json(record);
  } catch (err) {
    next(err);
  }
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
