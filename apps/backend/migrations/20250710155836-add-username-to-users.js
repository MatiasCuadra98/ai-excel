'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // First add the column as nullable
    await queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    });

    // Update existing users with a default username
    await queryInterface.sequelize.query(
      "UPDATE users SET username = 'Dev' WHERE email = 'user@user.com'"
    );

    // Now make it NOT NULL and UNIQUE
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'username');
  }
};
