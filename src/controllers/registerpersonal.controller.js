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
export async function updatePersonal(req, res) {
  const { id } = req.params;
  const { nombre, cargo } = req.body;

  try {
    const personal = await RegisterPersonal.findByPk(id);
    if (!personal) {
      return res.status(404).json({ msg: 'Personal no encontrado' });
    }

    personal.nombre = nombre ?? personal.nombre;
    personal.cargo = cargo ?? personal.cargo;

    await personal.save();

    res.json({
      msg: 'Datos actualizados correctamente',
      personal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar datos' });
  }
}
export async function deletePersonal(req, res) {
  const { id } = req.params;

  try {
    const personal = await RegisterPersonal.findByPk(id);

    if (!personal) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await personal.destroy();

    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ msg: 'Error interno al eliminar el usuario' });
  }
}