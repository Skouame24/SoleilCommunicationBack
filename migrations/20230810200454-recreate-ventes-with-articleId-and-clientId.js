'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ventes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prixVente: {
        type: Sequelize.FLOAT
      },
      dateVente: {
        type: Sequelize.DATE
      },
      montantTVA: {
        type: Sequelize.FLOAT
      },
      tauxRemise: {
        type: Sequelize.FLOAT
      },
      montantTotal: {
        type: Sequelize.FLOAT
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Modifiez si nécessaire
        references: {
          model: 'Articles', // Nom de la table "Articles"
          key: 'id' // Clé primaire de la table "Articles"
        },
        onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
        onDelete: 'SET NULL' // Action en cas de suppression de la clé primaire
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Modifiez si nécessaire
        references: {
          model: 'Clients', // Nom de la table "Clients"
          key: 'id' // Clé primaire de la table "Clients"
        },
        onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
        onDelete: 'SET NULL' // Action en cas de suppression de la clé primaire
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ventes');
  }
};
