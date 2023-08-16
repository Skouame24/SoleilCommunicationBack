'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Achats', 'articleId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Modifiez si nécessaire
      references: {
        model: 'Articles', // Nom de la table "Articles"
        key: 'id' // Clé primaire de la table "Articles"
      },
      onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
      onDelete: 'SET NULL' // Action en cas de suppression de la clé primaire
    });

    await queryInterface.addColumn('Achats', 'fournisseurId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Modifiez si nécessaire
      references: {
        model: 'Fournisseurs', // Nom de la table "Fournisseurs"
        key: 'id' // Clé primaire de la table "Fournisseurs"
      },
      onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
      onDelete: 'SET NULL' // Action en cas de suppression de la clé primaire
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Achats', 'articleId');
    await queryInterface.removeColumn('Achats', 'fournisseurId');
  }
};
