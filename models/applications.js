'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applications.hasMany(models.Files, {
        foreignKey: "application_id",
      });
      Applications.hasMany(models.Sharing_Applications, {
        foreignKey: "application_id",
      });
      Applications.hasOne(models.Sessions, {
        foreignKey: "application_id",
      });
      Applications.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Applications.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Applications',
  });
  return Applications;
};