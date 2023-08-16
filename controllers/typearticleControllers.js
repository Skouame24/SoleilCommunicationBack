const { TypeArticle } = require('../models');

const TypeArticleController = {
  // Méthode pour créer un nouveau type d'article
  createTypeArticle: async (req, res) => {
    try {
      const { nom } = req.body;
      const typeArticle = await TypeArticle.create({ nom });

      // Envoyer la réponse avec le nouveau type d'article créé
      res.status(201).json({ message: 'Type d\'article créé avec succès', typeArticle });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la création du type d\'article', error });
    }
  },

  // Méthode pour lire tous les types d'articles
  getAllTypeArticles: async (req, res) => {
    try {
      const typeArticles = await TypeArticle.findAll();

      // Envoyer la réponse avec la liste des types d'articles
      res.status(200).json({ typeArticles });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des types d\'articles', error });
    }
  },

  // Méthode pour obtenir un type d'article par son ID
  getTypeArticleById: async (req, res) => {
    const { id } = req.params;

    try {
      // Rechercher le type d'article dans la base de données en fonction de l'ID
      const typeArticle = await TypeArticle.findByPk(id);

      if (typeArticle) {
        res.status(200).json({ typeArticle });
      } else {
        res.status(404).json({ error: 'Type d\'article non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du type d\'article :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du type d\'article' });
    }
  }
};

module.exports = TypeArticleController;
