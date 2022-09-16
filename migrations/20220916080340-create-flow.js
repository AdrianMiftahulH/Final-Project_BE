'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flows', {
      id_flow: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_barang: {
        foreigenKey: true,  
        type: Sequelize.INTEGER
      },
      jumlah: {
        type: Sequelize.NUMERIC
      },
      status: {
        type: Sequelize.STRING
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      tgl_masuk: {
        type: Sequelize.DATE
      },
      tgl_keluar: {
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