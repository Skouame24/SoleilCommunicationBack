const { Vente, Article, Client } = require('../models');

const VenteController = {
  createVente: async (req, res) => {
    try {
      const { prixVente, dateVente, montantTVA, tauxRemise, montantTotal, clientId, articleData,remiseTotalPourcent  } = req.body;

       // Vérifier si le prix de vente est supérieur au prix d'achat pour tous les articles
      const invalidArticles = articleData.filter(article => article.prixVente < article.prix);

      if (invalidArticles.length > 0) {
        return res.status(400).json({ message: "Le prix de vente doit être supérieur ou égal au prix d'achat pour tous les articles" });
      }
      
      for (const article of articleData) {
        const { articleId, quantite } = article;

        const articleInstance = await Article.findByPk(articleId);

        if (!articleInstance) {
          return res.status(404).json({ message: `Article avec ID ${articleId} non trouvé` });
        }

        const prixAchatArticle = articleInstance.prixAchat; // Remplacez cela par la propriété correspondante de votre modèle Article

        if (article.prixVente <= prixAchatArticle) {
          return res.status(400).json({ message: `Le prix de vente doit être supérieur au prix d'achat pour l'article avec ID ${articleId}` });
        }

        if (articleInstance.quantite < quantite) {
          return res.status(400).json({ message: `Quantité insuffisante pour l'article avec ID ${articleId}` });
        }
      }


      // Créer la vente avec le clientId
      const vente = await Vente.create({
        prixVente,
        dateVente,
        montantTVA,
        tauxRemise,
        montantTotal,
        clientId,
        articleData,
        remiseTotalPourcent   // Utilisez le même nom de variable ici
      });


      // Mettre à jour la quantité des articles vendus
      for (const article of articleData) {
        const { articleId, quantite } = article;

        const articleInstance = await Article.findByPk(articleId);

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
  updateVente: async (req, res) => {
    try {
      const { venteId } = req.params;
      const { prixVente, dateVente, montantTVA, tauxRemise, montantTotal, clientId, articleData ,remiseTotalPourcent } = req.body;
  
      // Vérifier si la vente existe
      const vente = await Vente.findByPk(venteId);
      if (!vente) {
        return res.status(404).json({ message: 'Vente non trouvée' });
      }
  
      // Restituer la quantité de l'article initial (iPhone X)
      for (const article of vente.articleData) {
        const { articleId, quantite } = article;
        const articleInstance = await Article.findByPk(articleId);
        articleInstance.quantite += quantite;
        await articleInstance.save();
      }
  
      // Soustraire la quantité de l'article modifié (iPhone 11)
      for (const article of articleData) {
        const { articleId, quantite } = article;
        const articleInstance = await Article.findByPk(articleId);
        if (!articleInstance) {
          return res.status(404).json({ message: `Article avec ID ${articleId} non trouvé` });
        }
        articleInstance.quantite -= quantite;
        await articleInstance.save();
      }
  
      // Mettre à jour les données de la vente
      vente.prixVente = prixVente;
      vente.dateVente = dateVente;
      vente.montantTVA = montantTVA;
      vente.tauxRemise = tauxRemise;
      vente.montantTotal = montantTotal;
      vente.clientId = clientId;
      vente.articleData = articleData; // Assurez-vous que cette propriété existe dans votre modèle
      vente.remiseTotalPourcent = remiseTotalPourcent;
  
      // Sauvegarder les modifications
      await vente.save();
  
      // Envoyer la réponse avec la vente mise à jour
      res.status(200).json({ message: 'Vente mise à jour avec succès', vente });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la vente', error });
    }
  },
  

};

module.exports = VenteController;
