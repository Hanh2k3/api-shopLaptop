'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Shipping, { foreignKey: 'shipping_id', targetKey: 'id'})
      Order.belongsTo(models.Payment, { foreignKey: 'payment_id', targetKey: 'id'})
      Order.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id'})
    }
  }
  Order.init({
 
    user_id: DataTypes.INTEGER,
    shipping_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    total_product : DataTypes.FLOAT,
    total : DataTypes.FLOAT, 
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};