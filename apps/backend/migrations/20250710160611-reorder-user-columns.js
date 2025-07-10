'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Just update the username value from 'matias' to 'Dev'
    await queryInterface.sequelize.query(
      "UPDATE users SET username = 'Dev' WHERE username = 'matias' OR email = 'user@user.com'"
    );
  },

  async down (queryInterface, Sequelize) {
    // Revert username back to 'matias'
    await queryInterface.sequelize.query(
      "UPDATE users SET username = 'matias' WHERE username = 'Dev'"
    );
  }
};
