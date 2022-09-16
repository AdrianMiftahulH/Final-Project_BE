'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('barangs', {
      id_barang: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_sup: {
        foreigenKey: true,  
        type: Sequelize.INTEGER
      },
      id_kat: {
        foreigenKey: true,  
        type: Sequelize.INTEGER
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      jumlah: {
        type: Sequelize.NUMERIC
      },
      foto: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('barangs');
  }
};