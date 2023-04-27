'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserInforShipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInforShipping.hasMany(models.User, { foreignKey: 'id', targetKey: 'user_id'})
      UserInforShipping.hasMany(models.InforShipping, { foreignKey: 'id', targetKey: 'inforShipping_id'})
    }
  }
  UserInforShipping.init({
    user_id: DataTypes.INTEGER,
    inforShipping_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserInforShipping',
  })
  return UserInforShipping
}