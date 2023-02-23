'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Laptop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      
    }
  }
  Role.init({
    laptop_name: DataTypes.STRING,
    qty: DataTypes.INT,
    price: DataTypes.FLOAT,
    status: DataTypes.INT,
    brand_id: DataTypes.INT,
    detail_id: DataTypes.INT,
  }, {
    sequelize,
    modelName: 'Role',
  })
  return Role
}