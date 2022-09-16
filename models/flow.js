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
      // define association here
    }
  }
  flow.init({
    kode_barang: DataTypes.INTEGER,
    jumlah: DataTypes.NUMERIC,
    status: DataTypes.STRING,
    nama_barang: DataTypes.STRING,
    tgl_masuk: DataTypes.DATE,
    tgl_keluar: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'flow',
  });
  return flow;
};