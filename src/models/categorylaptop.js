'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CategoryLaptop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryLaptop.hasMany(models.Laptop, { foreignKey: 'id', targetKey: 'laptop_id'})
      CategoryLaptop.hasMany(models.Category, { foreignKey: 'id', targetKey: 'category_id'})
    }
  }
  CategoryLaptop.init({
    category_id: DataTypes.INTEGER,
    laptop_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryLaptop',
  })
  return CategoryLaptop
}