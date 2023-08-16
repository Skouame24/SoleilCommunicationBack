const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Achat extends Model {
    static associate(models) {
      Achat.belongsTo(models.Fournisseur, {
        foreignKey: 'fournisseurId',
        as: 'fournisseur',
      });

      Achat.belongsToMany(models.Article, {
        through: 'AchatArticle',
        foreignKey: 'achatId',
        otherKey: 'articleId',
        as: 'achatArticles', // Utilisez un nom différent pour l'association
      });
    }
  }

  Achat.init({
    prixAchat: DataTypes.FLOAT,
    dateAchat: DataTypes.DATE,
    montantTVA: DataTypes.FLOAT,
    tauxRemise: DataTypes.FLOAT,
    montantTotal: DataTypes.FLOAT,
    // Renommez l'attribut 'articles' en quelque chose de différent, par exemple 'articlesData'
    articlesData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Achat',
  });

  return Achat;
};
