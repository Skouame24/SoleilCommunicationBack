const { Article, Boutique, Categorie, TypeArticle } = require('../models');

const ArticleController = {
    // Méthode pour créer un nouvel article
    createArticle: async (req, res) => {
      try {
        const {
          designation,
          caracteristique,
          quantite,
          entreeDirecte,
          entreeIndirecte,
          sortieDirecte,
          sortieIndirecte,
          prixAchat,
          boutiqueId,
          categorieId,
          typeArticleId, // Ajout du champ typeArticleId
        } = req.body;

  
  
        // Vérifier si la boutique, la catégorie et le type existent avant de créer l'article
        const boutique = await Boutique.findByPk(boutiqueId);
        if (!boutique) {
          return res.status(404).json({ error: 'Boutique non trouvée' });
        }
  
        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
          return res.status(404).json({ error: 'Catégorie non trouvée' });
        }
  
        // Vérification de la quantité pour éviter les valeurs négatives
        if (quantite < 0) {
          return res.status(400).json({ error: 'La quantité ne peut pas être négative' });
        }
  
        // Vérifier si le type d'article existe
        const typeArticle = await TypeArticle.findByPk(typeArticleId);
        if (!typeArticle) {
          return res.status(404).json({ error: 'Type d\'article non trouvé' });
        }
  
        // Créer l'article
        const article = await Article.create({
          designation,
          caracteristique,
          quantite,
          entreeDirecte,
          entreeIndirecte,
          sortieDirecte,
          sortieIndirecte,
          prixAchat,
          boutiqueId,
          categorieId,
          typeArticleId, // Ajout du champ typeArticleId
        });
  
        // Envoyer la réponse avec le nouvel article créé
        res.status(201).json({ message: 'Article créé avec succès', article });
      } catch (error) {
        console.error('Erreur lors de la création de l\'article :', error);
        // Envoyer une réponse d'erreur avec des informations détaillées
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'article', error });
      }
    },
  // Méthode pour lire tous les articles
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.findAll();

      // Envoyer la réponse avec la liste des articles
      res.status(200).json({ articles });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des articles', error });
    }
  },

  // Méthode pour obtenir un article par son ID
  getArticleById: async (req, res) => {
    const { id } = req.params;

    try {
      // Rechercher l'article dans la base de données en fonction de l'ID
      const article = await Article.findByPk(id, {
        include: [
          { model: Boutique, as: 'boutique' },
          { model: Categorie, as: 'categorie' },
        ],
      });

      if (article) {
        res.status(200).json({ article });
      } else {
        res.status(404).json({ error: 'Article non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
    }
  },
  
 // Méthode pour obtenir les articles d'une catégorie spécifique
 getArticlesByCategory: async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Rechercher la catégorie dans la base de données en fonction de l'ID
    const category = await Categorie.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    // Rechercher les articles associés à la catégorie
    const articles = await Article.findAll({
      where: { categorieId: categoryId },
    });

    // Envoyer la réponse avec la liste des articles de la catégorie
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles de la catégorie :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles de la catégorie' });
  }
},
// Méthode pour supprimer un article par son ID
deleteArticleById: async (req, res) => {
  const { id } = req.params;

  try {
    // Chercher l'article dans la base de données en fonction de l'ID
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    // Ajouter l'article supprimé au tableau
    deletedArticles.push(article);

    // Supprimer l'article
    await article.destroy();

    // Envoyer la réponse avec un message de succès
    res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'article', error });
  }
},
};

module.exports = ArticleController;
