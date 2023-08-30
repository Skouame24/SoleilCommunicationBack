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
        as: 'achatArticles', // Use a different name for the association
      });
    }
  }

  Achat.init({
    prixAchat: DataTypes.FLOAT,
    dateAchat: DataTypes.DATE,
    montantTVA: DataTypes.FLOAT,
    tauxRemise: DataTypes.FLOAT,
    montantTotal: DataTypes.FLOAT,
    remiseTotalPourcent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    // Rename the 'articles' attribute to something different, e.g., 'articlesData'
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
