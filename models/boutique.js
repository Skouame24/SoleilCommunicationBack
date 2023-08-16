const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Boutique extends Model {
    static associate(models) {
      Boutique.hasMany(models.Article, {
        foreignKey: 'boutiqueId', // Clé étrangère dans la table Article
        as: 'articles', // Alias pour l'accès aux articles associés
      });

      Boutique.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'utilisateur',
      });
          }
  }

  Boutique.init({
    nom: DataTypes.STRING,
    adresse: DataTypes.STRING,
    localisation: DataTypes.STRING,
    utilisateurId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilisateur', // Nom de la table "Utilisateur"
        key: 'id', // Clé primaire de la table "Utilisateur"
      },
    },
  }, {
    sequelize,
    modelName: 'Boutique',
  });

  return Boutique;
};
