'use strict';
module.exports = {
  async up (qi, Sequelize) {
    await qi.addColumn('ParkingRecords', 'amountCharged', {
      type: Sequelize.INTEGER,      // valor en pesos
      allowNull: true
    });
  },
  async down (qi) {
    await qi.removeColumn('ParkingRecords', 'amountCharged');
  }
};
