'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailFlow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      detailFlow.belongsTo(models.flow,{
        foreignKey: 'id_flow',
        as: 'flow'
      })
      detailFlow.belongsTo(models.product,{
        foreignKey: 'id_product',
        as: 'product'
      })
    }
  }
  detailFlow.init({
    id_flow: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detailFlow',
  });
  return detailFlow;
};