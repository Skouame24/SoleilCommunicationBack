const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.Boutique, {
        foreignKey: 'boutiqueId',
        as: 'boutique',
      });

      Article.belongsToMany(models.Vente, {
        through: 'VenteArticle',
        foreignKey: 'articleId',
        otherKey: 'venteId',
        as: 'ventes',
      });

      Article.belongsToMany(models.Achat, {
        through: 'AchatArticle',
        foreignKey: 'articleId',
        otherKey: 'achatId',
        as: 'achats',
      });

      Article.belongsTo(models.Categorie, {
        foreignKey: 'categorieId',
        as: 'categorie',
      });

      Article.belongsTo(models.TypeArticle, {  // Ajoutez cette ligne pour la relation avec le type d'article
        foreignKey: 'typeArticleId',           // Clé étrangère vers le type d'article
        as: 'typeArticle',                     // Alias pour accéder au type d'article depuis un objet Article
      });
    }
  }

  Article.init({
    designation: DataTypes.STRING,
    caracteristique: DataTypes.STRING,
    quantite: DataTypes.INTEGER,
    entreeDirecte: DataTypes.BOOLEAN,
    entreeIndirecte: DataTypes.BOOLEAN,
    sortieDirecte: DataTypes.BOOLEAN,
    sortieIndirecte: DataTypes.BOOLEAN,
    prixAchat: DataTypes.FLOAT,
    boutiqueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Boutique',
        key: 'id',
      },
    },
    categorieId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorie',
        key: 'id',
      },
    },
    typeArticleId: {   // Ajoutez cette ligne pour la clé étrangère vers le type d'article
      type: DataTypes.INTEGER,
      references: {
        model: 'TypeArticle',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Article',
  });

  return Article;
};
