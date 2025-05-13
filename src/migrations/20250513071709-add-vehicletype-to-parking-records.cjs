'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ParkingRecords', 'vehicleType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'carro'   // moto | carro
    });
  },
  async down (queryInterface) {
    await queryInterface.removeColumn('ParkingRecords', 'vehicleType');
  }
};

