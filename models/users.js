'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Applications, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Queues, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Ecourts, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Histories, {
        foreignKey: "user_id",
      });
    }
  }
  Users.init({
    nik: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    gender: DataTypes.STRING,
    status: DataTypes.STRING,
    job: DataTypes.STRING,
    nationality: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.addHook('beforeValidate', (user, options) => {
    if (user.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    } else {
      user.password = '';
    }
  });
  return Users;
};