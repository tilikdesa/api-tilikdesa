'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employees.belongsTo(models.Roles, {
        foreignKey: "role_id",
      });
      Employees.hasMany(models.Queues, {
        foreignKey: "employee_id",
      });
      Employees.hasMany(models.Sessions, {
        foreignKey: "judge_id",
      });
    }
  }

  Employees.init({
    role_id: DataTypes.INTEGER,
    identity_number: DataTypes.STRING,
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    last_education: DataTypes.STRING,
    department: DataTypes.STRING,
    class: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employees',
  });

  Employees.addHook('beforeValidate', (employee, options) => {
    if (employee.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(employee.password, salt);
      employee.password = hash;
    } else {
      employee.password = '';
    }
  });

  return Employees;
};