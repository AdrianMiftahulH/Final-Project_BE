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
      barang.belongsTo(models.kategori,{
        foreignKey: 'id_kat',
        as: 'kategori'
      }),
      barang.belongsTo(models.supplier,{
        foreignKey: 'id_supp',
        as: 'supplier'
      }),
      barang.hasMany(models.flow, {
        foreignKey: 'id_',
        as: 'barangs'
      })
    }
  }
  barang.init({
    id_supp: DataTypes.INTEGER,
    id_kat: DataTypes.INTEGER,
    nama_barang: DataTypes.STRING,
    jumlah: DataTypes.NUMERIC,
    foto: DataTypes.STRING,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};