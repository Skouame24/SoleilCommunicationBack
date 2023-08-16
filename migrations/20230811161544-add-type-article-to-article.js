'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Articles', 'typeArticleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'TypeArticles', // Assurez-vous que le nom de la table est correct
        key: 'id',
      },
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Articles', 'typeArticleId');
  },
};
