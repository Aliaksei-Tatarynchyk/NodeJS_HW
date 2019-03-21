'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    author: DataTypes.STRING,
    productId: DataTypes.STRING,
    review: DataTypes.STRING
  }, { timestamps: false });
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};