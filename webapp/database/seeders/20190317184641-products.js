'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      id: "prd00556",
      displayName: "Macadamia Oil",
      price: 99.99
    }, {
      id: "prd00487",
      displayName: "Obagi face care",
      price: 50
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
