'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Partners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Partners.hasMany(models.Sharing_Applications, {
        foreignKey: "partner_id",
      });
    }
  }

  Partners.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    institution: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partners',
  });

  Partners.addHook('beforeValidate', (partner, options) => {
    if (partner.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(partner.password, salt);
      partner.password = hash;
    } else {
      partner.password = '';
    }
  });

  return Partners;
};