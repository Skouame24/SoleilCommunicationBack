/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Achats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prixAchat: {
        type: Sequelize.FLOAT
      },
      dateAchat: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addColumn('Articles', 'achatId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Achats', // Nom de la table "Achats"
        key: 'id', // Clé primaire de la table "Achats"
      },
      onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
      onDelete: 'CASCADE', // Action en cas de suppression de la clé primaire
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Articles', 'achatId');
    await queryInterface.dropTable('Achats');
  }
};
