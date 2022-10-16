'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  log.init({
    dateLog: DataTypes.STRING,
    method: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING,
    response: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'log',
  });
  return log;
};