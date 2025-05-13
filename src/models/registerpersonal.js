import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class RegisterPersonal extends Model {}

RegisterPersonal.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateRegister: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'RegisterPersonal',
  tableName: 'RegisterPersonal',
  timestamps: false
});
