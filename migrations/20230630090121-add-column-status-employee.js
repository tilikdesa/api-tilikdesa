'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */

    queryInterface.addColumn('Employees', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'Active',
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */

    queryInterface.removeColumn('Employee', 'status', {
      /* query options */
    });
  }
};