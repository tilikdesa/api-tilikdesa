'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sessions.belongsTo(models.Applications, {
        foreignKey: "application_id",
      });
      Sessions.belongsTo(models.Employees, {
        as: 'Judge',
        foreignKey: "judge_id"
      });
    }
  }
  Sessions.init({
    application_id: DataTypes.INTEGER,
    judge_id: DataTypes.INTEGER,
    register_date: DataTypes.DATE,
    case_number: DataTypes.STRING,
    case_schedule: DataTypes.DATE,
    session_location: DataTypes.STRING,
    file_decision: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sessions',
  });
  return Sessions;
};