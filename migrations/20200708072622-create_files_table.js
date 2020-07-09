'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
          type: Sequelize.CHAR(11),
          allowNull: false,
          unique: true,
          primaryKey: true
      },
      keycode: {
          type: Sequelize.STRING(11),
          allowNull: false,
          unique: true,
          trim: true
      },
      deleteTime: {
          type: Sequelize.INTEGER,
          allowNull: false,
          trim: true
      },
      fileInfo: {
          type: Sequelize.TEXT,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
  })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files')
  }
};
