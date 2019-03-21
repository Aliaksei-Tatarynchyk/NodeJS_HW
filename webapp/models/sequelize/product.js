'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    displayName: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, { timestamps: false });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};