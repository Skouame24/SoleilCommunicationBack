const { Vente, Article, Client } = require('../models');

const VenteController = {
  createVente: async (req, res) => {
    try {
      const { prixVente, dateVente, montantTVA, tauxRemise, montantTotal, clientId, articleData } = req.body;

      // Créer la vente avec le clientId
      const vente = await Vente.create({
        prixVente,
        dateVente,
        montantTVA,
        tauxRemise,
        montantTotal,
        clientId,
        articleData  // Utilisez le même nom de variable ici
      });

      // Mettre à jour la quantité des articles vendus
      for (const article of articleData) {
        const { articleId, quantite } = article;
        
        const articleInstance = await Article.findByPk(articleId);

        if (!articleInstance) {
          return res.status(404).json({ message: `Article avec ID ${articleId} non trouvé` });
        }

        // Mettez à jour la quantité en conséquence
        articleInstance.quantite -= quantite;
        await articleInstance.save();
      }

      // Envoyer la réponse avec la nouvelle vente créée
      res.status(201).json({ message: 'Vente créée avec succès', vente });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de la vente', error });
    }
  },

  // Autres méthodes du contrôleur pour lire, mettre à jour ou supprimer une vente

  // Méthode pour lire toutes les ventes
  getAllVentes: async (req, res) => {
    try {
      const ventes = await Vente.findAll({
        include: [
          { model: Article, as: 'venteArticles' },
          { model: Client, as: 'client' }
        ]
      });

      // Envoyer la réponse avec la liste des ventes
      res.status(200).json({ ventes });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des ventes', error });
    }
  },
  
  getVenteById: async (req, res) => {
    try {
      const { venteId } = req.params;

      const vente = await Vente.findByPk(venteId, {
        include: [
          { model: Article, as: 'venteArticles' },
          { model: Client, as: 'client' }
        ]
      });

      if (!vente) {
        return res.status(404).json({ message: 'Vente non trouvée' });
      }

      // Envoyer la réponse avec les détails de la vente
      res.status(200).json({ vente });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la vente', error });
    }
  },
};

module.exports = VenteController;
