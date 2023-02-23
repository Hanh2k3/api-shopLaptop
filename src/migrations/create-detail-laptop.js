'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailLaptops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ram: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      card_vga : {
        type: Sequelize.STRING
      },
      webcam : {
        allowNull: false,
        type: Sequelize.STRING
      },
      connect : {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight : {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      pin : {
        allowNull: false,
        type: Sequelize.STRING
      },
      os : {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc : {
        allowNull: false,
        type: Sequelize.STRING
      },
      other : {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailLaptops');
  }
};