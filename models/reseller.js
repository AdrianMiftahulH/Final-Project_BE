'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reseller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reseller.init({
    name_resel: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reseller',
  });
  return reseller;
};