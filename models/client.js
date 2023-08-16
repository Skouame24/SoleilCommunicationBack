const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.hasMany(models.Vente, {
        foreignKey: 'clientId', // Clé étrangère dans la table Vente
        as: 'ventes', // Alias pour l'accès aux ventes associées
      });
    }
  }

  Client.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    localisation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};
