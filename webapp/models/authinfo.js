'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthInfo = sequelize.define('AuthInfo', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    twitterProfileId: DataTypes.STRING,
    facebookProfileId: DataTypes.STRING,
    googleProfileId: DataTypes.STRING
  }, { timestamps: false });
  AuthInfo.associate = function(models) {
    // associations can be defined here
  };
  return AuthInfo;
};