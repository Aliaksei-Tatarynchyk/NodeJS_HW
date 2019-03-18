'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AuthInfos', [{
      login: "admin",
      password: "Admin123",
      twitterProfileId: "",
      facebookProfileId: "",
      googleProfileId: "107232008032104519591"
    }, {
      login: "anon",
      password: "Fake123",
      twitterProfileId: "",
      facebookProfileId: "3169235779768958",
      googleProfileId: ""
    }, {
      login: "fakeNonExistentUser",
      password: "Fake123",
      twitterProfileId: "",
      facebookProfileId: "",
      googleProfileId: ""
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AuthInfos', null, {});
  }
};
