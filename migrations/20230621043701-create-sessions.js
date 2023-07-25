'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      application_id: {
        type: Sequelize.INTEGER
      },
      judge_id: {
        type: Sequelize.INTEGER
      },
      register_date: {
        type: Sequelize.DATE
      },
      case_number: {
        type: Sequelize.STRING
      },
      case_schedule: {
        type: Sequelize.DATE
      },
      session_location: {
        type: Sequelize.STRING
      },
      file_decision: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};