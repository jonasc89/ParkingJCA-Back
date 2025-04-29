'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ParkingRecords', 'durationHours', {
      type: Sequelize.INTEGER,
      allowNull: true,       // inicialmente null
      defaultValue: null
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('ParkingRecords', 'durationHours');
  }
};
