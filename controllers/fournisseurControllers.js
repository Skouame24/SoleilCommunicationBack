const { Fournisseur } = require('../models');

const FournisseurController = {
  // Méthode pour créer un nouveau fournisseur
  createFournisseur: async (req, res) => {
    try {
      const { nom, prenom, email, contact, localisation } = req.body;
      const fournisseur = await Fournisseur.create({ nom, prenom, email, contact, localisation });

      // Envoyer la réponse avec le nouveau fournisseur créé
      res.status(201).json({ message: 'Fournisseur créé avec succès', fournisseur });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la création du fournisseur', error });
    }
  },

  // Méthode pour récupérer les informations d'un fournisseur
  getFournisseur: async (req, res) => {
    try {
      const { id } = req.params;
      const fournisseur = await Fournisseur.findByPk(id);

      if (fournisseur) {
        // Envoyer la réponse avec les informations du fournisseur
        res.status(200).json({ fournisseur });
      } else {
        // Si le fournisseur n'est pas trouvé, envoyer une réponse avec un message d'erreur
        res.status(404).json({ message: 'Fournisseur non trouvé' });
      }
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des informations du fournisseur', error });
    }
  },

  // Méthode pour mettre à jour un fournisseur
  updateFournisseur: async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, prenom, email, contact, localisation } = req.body;
      const [updatedRowCount, updatedFournisseurs] = await Fournisseur.update(
        { nom, prenom, email, contact, localisation },
        { where: { id }, returning: true }
      );

      if (updatedRowCount > 0) {
        // Envoyer la réponse avec les informations du fournisseur mis à jour
        res.status(200).json({ message: 'Fournisseur mis à jour avec succès', fournisseur: updatedFournisseurs[0] });
      } else {
        // Si le fournisseur n'est pas trouvé, envoyer une réponse avec un message d'erreur
        res.status(404).json({ message: 'Fournisseur non trouvé' });
      }
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du fournisseur', error });
    }
  },

  // Méthode pour supprimer un fournisseur
  deleteFournisseur: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Fournisseur.destroy({ where: { id } });

      if (deletedRowCount > 0) {
        // Envoyer la réponse avec un message de succès
        res.status(200).json({ message: 'Fournisseur supprimé avec succès' });
      } else {
        // Si le fournisseur n'est pas trouvé, envoyer une réponse avec un message d'erreur
        res.status(404).json({ message: 'Fournisseur non trouvé' });
      }
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du fournisseur', error });
    }
  },

  // Méthode pour lire tous les fournisseurs
  getAllFournisseurs: async (req, res) => {
    try {
      const fournisseurs = await Fournisseur.findAll();

      // Envoyer la réponse avec la liste des fournisseurs
      res.status(200).json({ fournisseurs });
    } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des fournisseurs', error });
    }
  },
};

module.exports = FournisseurController;
