'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AuthInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      twitterProfileId: {
        type: Sequelize.STRING
      },
      facebookProfileId: {
        type: Sequelize.STRING
      },
      googleProfileId: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AuthInfos');
  }
};