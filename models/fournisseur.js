const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Fournisseur extends Model {
    static associate(models) {
      Fournisseur.hasMany(models.Achat, {
        foreignKey: 'fournisseurId', // Clé étrangère dans la table Achat
        as: 'achats', // Alias pour l'accès aux achats associés
      });
    }
  }

  Fournisseur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    localisation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fournisseur',
  });

  return Fournisseur;
};
