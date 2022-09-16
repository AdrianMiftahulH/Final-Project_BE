'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  barang.init({
    nama_barang: DataTypes.STRING,
    jumlah: DataTypes.NUMERIC,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};