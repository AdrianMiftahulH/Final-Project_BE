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
      flow.belongsTo(models.supplier, {
        foreignKey: 'id_supp',
        as: 'supplier'
      })
      flow.belongsTo(models.distributor, {
        foreignKey: 'id_dist',
        as: 'distributor'
      })
      flow.hasMany(models.detailFlow, {
        foreignKey: 'id_flow',
        as: 'detailFlow'
    })
    }
  }
  flow.init({
    id_supp: DataTypes.INTEGER,
    id_dist: DataTypes.INTEGER,
    name_giver: DataTypes.STRING,
    name_receiver: DataTypes.STRING,
    status: DataTypes.STRING,
    date_add: DataTypes.DATE,
    date_drop: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'flow',
  });
  return flow;
};