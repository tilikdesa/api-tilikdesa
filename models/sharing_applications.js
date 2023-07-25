'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sharing_Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sharing_Applications.belongsTo(models.Applications, {
        foreignKey: "application_id",
      });
      Sharing_Applications.belongsTo(models.Partners, {
        foreignKey: "partner_id",
      });
    }
  }
  Sharing_Applications.init({
    application_id: DataTypes.INTEGER,
    partner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sharing_Applications',
  });
  return Sharing_Applications;
};