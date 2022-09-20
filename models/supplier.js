'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      supplier.hasMany(models.barang, {
        foreignKey: 'id_supp',
        as: 'barangs'
      })
    }
  }
  supplier.init({
    nama_supp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    noHp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'supplier',
  });
  return supplier;
};