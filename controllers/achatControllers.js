const { Achat, Article, Fournisseur } = require('../models');

const AchatController = {
  createAchat: async (req, res) => {
    try {
      const { dateAchat, articlesData, fournisseurId, montantTVA, tauxRemise, montantTotal } = req.body;

      // Créer l'achat
const achat = await Achat.create({
  dateAchat,
  fournisseurId,
  montantTVA,
  tauxRemise,
  montantTotal,
  articlesData, // Assurez-vous que addedArticles est correctement formaté
});

// Traiter chaque article dans la liste
for (const article of articlesData) {
  try {
    const { quantite, prixAchat, articleId } = article;

    // Trouver l'article par ID
    const existingArticle = await Article.findByPk(articleId);

    if (!existingArticle) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    // Utiliser la méthode d'association générée pour ajouter l'article à l'achat
    await achat.addAchatArticle(existingArticle, {
      through: {
        quantite: quantite,
        prixAchat: prixAchat,
        entreeDirecte: false, // Marquer l'entrée comme indirecte
      },
    });
  } catch (error) {
    // En cas d'erreur pour un article spécifique, vous pouvez la capturer ici
    console.error('Erreur lors du traitement d\'un article:', error);
    // Vous pouvez choisir de continuer le traitement des autres articles malgré cette erreur
  }
}

      // Envoyer la réponse avec le nouvel achat créé
      res.status(201).json({ message: 'Achat créé avec succès', achat });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'achat', error });
    }
  },

  // Autres méthodes du contrôleur pour lire, mettre à jour ou supprimer un achat

  // Méthode pour lire tous les achats
  getAllAchats: async (req, res) => {
    try {
      const achats = await Achat.findAll({
        include: [
          { model: Article, as: 'achatArticles' }, // Utilisez le même alias que dans le modèle Achat
          { model: Fournisseur, as: 'fournisseur' }
        ]
      });

      // Envoyer la réponse avec la liste des achats
      res.status(200).json({ achats });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des achats', error });
    }
  },
  
  getAchatById: async (req, res) => {
    try {
      const { achatId } = req.params;

      const achat = await Achat.findByPk(achatId, {
        include: [
          { model: Article, as: 'achatArticles' }, // Utilisez le même alias que dans le modèle Achat
          { model: Fournisseur, as: 'fournisseur' }
        ]
      });

      if (!achat) {
        return res.status(404).json({ message: 'Achat non trouvé' });
      }

      // Envoyer la réponse avec les détails de l'achat
      res.status(200).json({ achat });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'achat', error });
    }
  },
};

module.exports = AchatController;