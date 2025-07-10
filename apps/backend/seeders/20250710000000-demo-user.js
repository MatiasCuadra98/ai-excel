'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash the password "12345" for the demo user
    const hashedPassword = await bcrypt.hash('12345', 10);
    
    await queryInterface.bulkInsert('users', [{
      email: 'user@user.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'user@user.com'
    }, {});
  }
};
