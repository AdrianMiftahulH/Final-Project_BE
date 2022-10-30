'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_supp: {
        type: Sequelize.INTEGER
      },
      id_dist: {
        type: Sequelize.INTEGER
      },
      name_giver: {
        type: Sequelize.STRING
      },
      name_receiver: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      date_add: {
        type: Sequelize.DATE
      },
      date_drop:{
        type: Sequelize.DATE
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
    await queryInterface.dropTable('flows');
  }
};