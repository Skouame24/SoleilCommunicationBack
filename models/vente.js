const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vente extends Model {
    static associate(models) {
      Vente.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client',
      });
    
      // Mettez à jour cette association
      Vente.belongsToMany(models.Article, {
        through: 'VenteArticle',
        foreignKey: 'venteId',
        otherKey: 'articleId',
        as: 'venteArticles', // Utilisez un nom différent pour l'association
      });
    }
  }

  Vente.init({
    prixVente: DataTypes.FLOAT,
    dateVente: DataTypes.DATE,
    montantTVA: DataTypes.FLOAT,
    tauxRemise: DataTypes.FLOAT,
    montantTotal: DataTypes.FLOAT,
    remiseTotalPourcent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    articleData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Vente',
  });

  return Vente;
};
