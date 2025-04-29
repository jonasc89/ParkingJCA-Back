import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User extends Model {
  validPassword(pwd) { return bcrypt.compare(pwd, this.password); }
}

User.init({
  name:      { type: DataTypes.STRING, allowNull:false },
  email:     { type: DataTypes.STRING, allowNull:false, unique:true },
  password:  { type: DataTypes.STRING(60), allowNull:false }
}, { sequelize, modelName:'User' });

User.beforeCreate(async u => { u.password = await bcrypt.hash(u.password,10); });
