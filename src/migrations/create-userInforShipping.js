'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserInforShippings', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
      user_id: {
        allowNull: false,  
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inforShipping_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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

    await queryInterface.addConstraint('UserInforShippings', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'category_fkey__UserInforShipping',
        references : {
          table: 'Users', 
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
  
    })
    await queryInterface.addConstraint('UserInforShippings', {
        fields: ['inforShipping_id'],
        type: 'foreign key',
        name: 'UserInforShippings_fkey_laptop',
        references : {
          table: 'inforShippings', 
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserInforShippings');
  }
};