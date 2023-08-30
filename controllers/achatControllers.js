const { Achat, Article, Fournisseur } = require('../models');

const AchatController = {
  createAchat: async (req, res) => {
    try {
      const { dateAchat, articlesData, fournisseurId, montantTVA, tauxRemise, montantTotal,remiseTotalPourcent  } = req.body;

      // Créer l'achat
      const achat = await Achat.create({
        dateAchat,
        fournisseurId,
        montantTVA,
        tauxRemise,
        montantTotal,
        articlesData,
        remiseTotalPourcent 
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
              entreeDirecte: false,
            },
          });

          // Augmenter la quantité de l'article dans la base de données
          existingArticle.quantite += quantite;
          await existingArticle.save();
        } catch (error) {
          console.error('Une erreur est survenue lors de la création de l\'achat:', error);
          res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'achat', error });
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

  updateAchat: async (req, res) => {
    try {
      const { achatId } = req.params;
      const updatedData = req.body;
  
      // Vérifier si l'achat existe
      const achat = await Achat.findByPk(achatId);
      if (!achat) {
        return res.status(404).json({ message: 'Achat non trouvé' });
      }
  
      // Restituer la quantité de l'article initial
      for (const article of achat.articlesData) {
        const { articleId, quantite } = article;
        const articleInstance = await Article.findByPk(articleId);
        articleInstance.quantite += quantite;
        await articleInstance.save();
      }
  
      // Augmenter la quantité de l'article modifié
      for (const article of updatedData.articlesData) {
        const { articleId, quantite } = article;
        const articleInstance = await Article.findByPk(articleId);
        if (!articleInstance) {
          return res.status(404).json({ message: `Article avec ID ${articleId} non trouvé` });
        }
        articleInstance.quantite -= quantite;
        await articleInstance.save();
      }
  
      // Mettre à jour les données de l'achat avec les nouvelles valeurs
      achat.articlesData = updatedData.articlesData;
  
      // Mettre à jour d'autres propriétés de l'achat si nécessaire
      achat.montantTVA = updatedData.montantTVA;
      achat.tauxRemise = updatedData.tauxRemise;
      achat.montantTotal = updatedData.montantTotal;
      achat.remiseTotalPourcent = updatedData.remiseTotalPourcent;
  
      // Sauvegarder les modifications de l'achat
      await achat.save();
  
      // Envoyer la réponse avec l'achat mis à jour
      res.status(200).json({ message: 'Achat mis à jour avec succès', achat });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'achat', error });
    }
  },
  


};

module.exports = AchatController;