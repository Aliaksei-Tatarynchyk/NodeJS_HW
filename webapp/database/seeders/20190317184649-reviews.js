'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      productId: "prd00556",
      author: "Anna",
      review: `It's a very cool oil, I like it so much so I want to buy it more and more. 
      The only thing that upset me is the price - it's quite expensive...`
    },{
      productId: "prd00556",
      author: "Pavel",
      review: `I've bought it for my wife, she told me that she is really happy, but, god's heaven, why it's so expensive???`
    },{
      productId: "prd00487",
      author: "Anonymous",
      review: `I'll just leave it here`
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
