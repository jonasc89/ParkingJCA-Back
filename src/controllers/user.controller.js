import { User } from '../models/user.js';
export async function deleteUser(req,res,next){
  try{
    const rows = await User.destroy({ where:{ id: req.params.id } });
    if(!rows) return res.status(404).json({msg:'No encontrado'});
    res.json({msg:'Usuario eliminado'});
  }catch(err){ next(err); }
}
