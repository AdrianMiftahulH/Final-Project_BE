'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('distributors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logo_dist: {
        type: Sequelize.STRING
      },
      name_dist: {
        type: Sequelize.STRING
      },
      name_dist: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('distributors');
  }
};