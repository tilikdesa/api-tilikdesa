'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('Roles', [{
        role_type: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_type: 'Perdata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_type: 'Hukum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_type: 'Pidana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_type: 'Posbakum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_type: 'Hakim',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    const salt = bcrypt.genSaltSync(10);
    await queryInterface.bulkInsert('Employees', [{
      role_id: 1,
      identity_number: 9877829,
      fullname: 'Andi Santoso',
      username: 'asantoso',
      password: bcrypt.hashSync('asantoso', salt),
      birth_date: '1999-01-01',
      last_education: 'S1 Perpajakan',
      department: 'Keuangan',
      class: 'Pajak',
      createdAt: new Date(),
      updatedAt: new Date()
    }, ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Roles', null, {
      truncate: true,
      restartIdentity: true,
    });

    await queryInterface.bulkDelete('Employees', null, {
      truncate: true,
      restartIdentity: true,
    });
  }
};