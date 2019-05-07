var Sequelize = require("sequelize");
module.exports = (sequelize, type) => {
  var userData= sequelize.define(
    "USER",
    {
      userId: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: { type: type.STRING, allowNull: false },
      lastName: {
        type: type.STRING,
        allowNull: false
      },
      email: { type: type.STRING, allowNull: false, unique: true },
      password: { type: type.STRING, allowNull: false },
      role: { type: type.STRING, allowNull: false }
    },

    {
      freezeTableName: true
    }
    
  );
  return(userData)
};