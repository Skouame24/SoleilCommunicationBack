'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Achats', 'articlesData', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: [] // Valeur par défaut, vous pouvez laisser vide ou spécifier une valeur initiale
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Achats', 'articlesData');
  }
};
