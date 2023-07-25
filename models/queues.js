'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Queues.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      Queues.belongsTo(models.Employees, {
        foreignKey: "employee_id",
      });
    }
  }
  Queues.init({
    user_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    number_queue: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Queues',
  });
  return Queues;
};