import { ParkingRecord } from '../models/parkingrecord.js';
import { Op } from 'sequelize';
import { PRICES } from '../utils/prices.js';

export async function createEntry(req, res, next) {
  try {
    const { plate, vehicleType } = req.body;
    if (!plate || !vehicleType)
      return res.status(400).json({ msg: 'Faltan datos' });

    const record = await ParkingRecord.create({
      plate,
      vehicleType,
      UserId: req.user.id     // si registras al usuario que creó la entrada
    });
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
}


export async function closeEntry(req, res, next) {
  try {
    const record = await ParkingRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ msg: 'Registro no encontrado' });
    if (record.exitTime) return res.status(409).json({ msg: 'Ya está cerrado' });

    const exit = new Date();
    record.exitTime = exit;

    // duración en horas redondeada hacia arriba
    const hours = Math.ceil((exit - record.entryTime) / (1000 * 60 * 60));

    // regla de negocio
    const tariff = PRICES[record.vehicleType];   // carro | moto
    let amount   = tariff.fraccion;              // base

    if (record.vehicleType === 'carro' || record.vehicleType === 'moto') {
      if (hours > 4)       amount = tariff.dia;
      else if (hours > 0)  amount = tariff.hora * hours;
    } else {
      amount = 0; // otros casos futuros
    }

    record.durationHours = hours;
    record.amountCharged = amount;

    await record.save();
    res.json(record);
  } catch (err) { next(err); }
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
export async function obtenerPlacasActivas(req, res) {
  try {
    const placas = await ParkingRecord.findAll({
      where: {
        horaSalida: null
      }
    });

    res.json({ placas });
  } catch (error) {
    console.error('Error al obtener placas activas:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

