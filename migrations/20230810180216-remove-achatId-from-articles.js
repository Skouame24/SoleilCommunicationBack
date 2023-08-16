'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Articles', 'achatId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Articles', 'achatId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Achats',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Assurez-vous que l'action de suppression est conforme à vos besoins
    });
  }
};
