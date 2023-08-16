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
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Articles', // Nom de la table "Articles"
          key: 'id', // Clé primaire de la table "Articles"
        },
        onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
        onDelete: 'CASCADE', // Action en cas de suppression de la clé primaire
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
    await queryInterface.dropTable('Achats');
  }
};
