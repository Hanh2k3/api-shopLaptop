'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
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
    brand_name: DataTypes.STRING,
    status: DataTypes.INT
  }, {
    sequelize,
    modelName: 'Role',
  })
  return Role
}