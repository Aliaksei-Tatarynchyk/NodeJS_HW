'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};