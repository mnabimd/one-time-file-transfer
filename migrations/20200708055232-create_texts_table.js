'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("texts", {
      id: {
          type: Sequelize.CHAR(11),
          allowNull: false,
          unique: true
      },
      text: {
          type: Sequelize.TEXT,
          allowNull: false,
          trim: true,
      },
      keycode: {
          type: Sequelize.STRING(11),
          allowNull: false,
          unique: true,
          trim: true
      },
      deleteTime: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
          trim: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
  });

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("texts")
  }
};
