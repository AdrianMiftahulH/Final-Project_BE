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
      flow.belongsTo(models.product, {
        foreignKey: 'id_barang',
        as: 'type'
      })
    }
  }
  flow.init({
    id_barang: DataTypes.INTEGER,
    name_giver: DataTypes.STRING,
    name_receiver: DataTypes.STRING,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'flow',
  });
  return flow;
};