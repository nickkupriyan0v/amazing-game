'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      topicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'topics',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'comments', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('comments')
  }
}
