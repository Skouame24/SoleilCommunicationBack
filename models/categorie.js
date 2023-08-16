const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    static associate(models) {
      Categorie.hasMany(models.Article, {
        foreignKey: 'categorieId',
        as: 'articles',
      });
    }
  }

  Categorie.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie',
  });

  return Categorie;
};
