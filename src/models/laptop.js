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
      Laptop.belongsTo(models.Brand, { foreignKey: 'brand_id', targetKey: 'id'})
      Laptop.belongsTo(models.DetailLaptop, { foreignKey: 'detail_id' })
      Laptop.hasMany(models.Image, { foreignKey: 'laptop_id'})
      
    }
  }

  Laptop.init({
    laptop_name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    detail_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Laptop',
  })
  return Laptop
}