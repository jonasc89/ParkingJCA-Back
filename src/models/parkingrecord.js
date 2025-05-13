import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.js';

export class ParkingRecord extends Model {}

ParkingRecord.init({
  plate:      { type: DataTypes.STRING, allowNull:false },
  entryTime:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  exitTime:   { type: DataTypes.DATE, allowNull:true },
  durationHours: { type: DataTypes.INTEGER, allowNull: true},
  vehicleType: {type: DataTypes.STRING,allowNull: false },
  amountCharged: {type: DataTypes.INTEGER,allowNull: true}
}, { sequelize, modelName:'ParkingRecord' });

User.hasMany(ParkingRecord);
ParkingRecord.belongsTo(User);