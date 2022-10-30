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
      product.belongsTo(models.category,{
        foreignKey: 'id_cat',
        as: 'category'
      })
      product.hasMany(models.detailFlow, {
        foreignKey: 'id_product',
        as: 'product'
    })
    }
  }
  product.init({
    id_supp: DataTypes.INTEGER,
    id_cat: DataTypes.INTEGER,
    name_product: DataTypes.STRING,
    total: DataTypes.INTEGER,
    satuan: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};