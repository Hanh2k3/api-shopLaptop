
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Shipping.init({
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    notes: DataTypes.STRING,
    fees_ship : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Shipping',
  });
  return Shipping;
};