'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  async up (qi) {
    await qi.bulkInsert('Users',[{
      name:'Usuario Demo',
      email:'usuario@correo.com',
      password: await bcrypt.hash('123456',10),
      createdAt:new Date(),
      updatedAt:new Date()
    }]);
  },
  async down (qi){ await qi.bulkDelete('Users',null,{}); }
};

