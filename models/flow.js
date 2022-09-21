'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      flow.belongsTo(models.barang,{
        foreignKey: 'id_barang',
        as: 'barang'
      })
    }
  }
  flow.init({
    id_barang: DataTypes.INTEGER,
    nama_pemberi: DataTypes.STRING,
    nama_penerima: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    status: DataTypes.STRING,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'flow',
  });
  return flow;
};