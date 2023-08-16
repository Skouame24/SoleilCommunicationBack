const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TypeArticle extends Model {
    static associate(models) {
      // Définir l'association avec le modèle Article
      TypeArticle.hasMany(models.Article, {
        foreignKey: 'typeArticleId', // Clé étrangère dans la table Article qui fait référence à ce type d'article
        as: 'articles', // Alias pour accéder aux articles à partir d'un objet TypeArticle
      });
    }
  }

  TypeArticle.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeArticle',
  });

  return TypeArticle;
};
