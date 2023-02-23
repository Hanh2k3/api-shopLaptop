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
      
    }
  }
  CategoryLaptop.init({
    category_id: DataTypes.INTEGER,
    laptop_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  })
  return CategoryLaptop
}