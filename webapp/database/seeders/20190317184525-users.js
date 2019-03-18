'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: "admin",
      email: "brymda1990@gmail.com",
      firstName: "Aliaksei",
      lastName: "Tatarynchyk"
    }, {
      login: "anon",
      email: "anon@zoo.com",
      firstName: "Anonymous",
      lastName: "Pupkin"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
