'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryLaptops', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
      category_id: {
        allowNull: false,  
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      laptop_id: {
        allowNull: false,
        primaryKey: true,
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

    await queryInterface.addConstraint('categorylaptops', {
        fields: ['category_id'],
        type: 'foreign key',
        name: 'category_fkey__categoryLaptop',
        references : {
          table: 'categories', 
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
  
    })
    await queryInterface.addConstraint('categorylaptops', {
        fields: ['laptop_id'],
        type: 'foreign key',
        name: 'categorylaptops_fkey_laptop',
        references : {
          table: 'laptops', 
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CategoryLaptops');
  }
};