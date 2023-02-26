'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailLaptop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // DetailLaptop.belongsTo(models.Laptop, { foreignKey: 'detail_id', targetKey: 'id'})
    }
  }
  DetailLaptop.init({
    cpu: DataTypes.STRING,
    ram: DataTypes.STRING,
    rom: DataTypes.STRING,
    card_vga: DataTypes.STRING,
    webcam: DataTypes.STRING,
    connect: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    pin: DataTypes.STRING,
    os: DataTypes.STRING,
    desc: DataTypes.TEXT,
    other: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DetailLaptop',
  });
  return DetailLaptop;
};