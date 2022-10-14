'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // product.hasMany(models.product, {
      //   foreignKey: 'id_barang',
      //   as: 'product'
      // })
      product.belongsTo(models.supplier,{
        foreignKey: 'id_supp',
        as: 'supplier'
      })
    }
  }
  product.init({
    id_supp: DataTypes.INTEGER,
    name_product: DataTypes.STRING,
    color_product: DataTypes.STRING,
    series_product: DataTypes.STRING,
    fuel_type: DataTypes.STRING,
    body_type: DataTypes.STRING,
    total: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};