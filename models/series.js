'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // series.hasMany(models.product, {
      //   foreignKey: 'id_series',
      //   as: 'product'
      // })
    }
  }
  series.init({
    name_series: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'series',
  });
  return series;
};