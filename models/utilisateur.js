const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
  }

  Utilisateur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    login: DataTypes.STRING,
    motdepasse: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });

  return Utilisateur;
};
