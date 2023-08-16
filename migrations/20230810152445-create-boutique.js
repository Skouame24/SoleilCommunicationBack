/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boutiques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      localisation: {
        type: Sequelize.STRING
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilisateurs', // Nom de la table "Utilisateurs"
          key: 'id', // Clé primaire de la table "Utilisateurs"
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
    await queryInterface.dropTable('Boutiques');
  }
};
