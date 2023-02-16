'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type_account: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'local'
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false

      },
      name_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });

    await queryInterface.addConstraint('users', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'user_fkey_constraint_name',
      references : {
        table: 'roles', 
        field: 'id'
      },

      onDelete: 'cascade',
      onUpdate: 'cascade'

    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
  }
};