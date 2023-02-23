'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laptops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      laptop_name : {
        allowNull: false,
        type: Sequelize.STRING
      },
      qty : {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price : {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      status : {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      brand_id : {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      detail_id : {
        allowNull: false,
        type: Sequelize.INTEGER
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

    await queryInterface.addConstraint('laptops', {
        fields: ['brand_id'],
        type: 'foreign key',
        name: 'user_fkey_constraint_name',
        references : {
          table: 'brands', 
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
  
    })
    await queryInterface.addConstraint('laptops', {
        fields: ['detail_id'],
        type: 'foreign key',
        name: 'user_fkey_constraint_name',
        references : {
          table: 'detaillaptops', 
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailLaptops');
  }
};