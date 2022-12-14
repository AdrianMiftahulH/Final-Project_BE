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
      // define association here
      supplier.hasMany(models.flow, {
          foreignKey: 'id_supp',
          as: 'flow'
      })
    }
  }
  supplier.init({
    logo_supp: DataTypes.STRING,
    name_supp: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'supplier',
  });
  return supplier;
};