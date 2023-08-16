const { Categorie } = require('../models');

const CategorieController = {
  // Méthode pour créer une nouvelle catégorie
  createCategorie: async (req, res) => {
    try {
      const { nom,  } = req.body;
      const categorie = await Categorie.create({ nom,  });

      // Envoyer la réponse avec la nouvelle catégorie créée
      res.status(201).json({ message: 'Catégorie créée avec succès', categorie });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de la catégorie', error });
    }
  },

  // Méthode pour lire toutes les catégories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Categorie.findAll();

      // Envoyer la réponse avec la liste des catégories
      res.status(200).json({ categories });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des catégories', error });
    }
  },

  // Méthode pour obtenir une catégorie par son ID
  getCategorieById: async (req, res) => {
    const { id } = req.params;

    try {
      // Rechercher la catégorie dans la base de données en fonction de l'ID
      const categorie = await Categorie.findByPk(id);

      if (categorie) {
        res.status(200).json({ categorie });
      } else {
        res.status(404).json({ error: 'Catégorie non trouvée' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
    }
  }
};

module.exports = CategorieController;
