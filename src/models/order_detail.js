'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id', targetKey: 'id'})
      OrderDetail.belongsTo(models.Laptop, { foreignKey: 'laptop_id'})
    }
  }
  OrderDetail.init({
    laptop_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price : DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};