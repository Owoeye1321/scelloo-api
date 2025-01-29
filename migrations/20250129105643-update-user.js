'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'role',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Users',
          'password',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          { transaction: t }
        )
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
