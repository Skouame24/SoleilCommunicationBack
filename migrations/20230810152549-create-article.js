/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      designation: {
        type: Sequelize.STRING
      },
      caracteristique: {
        type: Sequelize.STRING
      },
      quantite: {
        type: Sequelize.INTEGER
      },
      entreeDirecte: {
        type: Sequelize.BOOLEAN
      },
      entreeIndirecte: {
        type: Sequelize.BOOLEAN
      },
      sortieDirecte: {
        type: Sequelize.BOOLEAN
      },
      sortieIndirecte: {
        type: Sequelize.BOOLEAN
      },
      prixAchat: {
        type: Sequelize.FLOAT
      },
      boutiqueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Boutiques', // Nom de la table "Boutiques"
          key: 'id', // Clé primaire de la table "Boutiques"
        },
        onUpdate: 'CASCADE', // Action en cas de mise à jour de la clé primaire
        onDelete: 'CASCADE', // Action en cas de suppression de la clé primaire
      },
      categorieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories', // Nom de la table "Categories"
          key: 'id', // Clé primaire de la table "Categories"
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
    await queryInterface.dropTable('Articles');
  }
};
