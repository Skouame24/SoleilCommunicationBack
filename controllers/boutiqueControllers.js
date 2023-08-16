const { Boutique } = require('../models');

// Méthode pour créer une boutique
async function createBoutique(req, res) {
  try {
    const { nom, adresse, localisation, utilisateurId } = req.body;

    // Créer une nouvelle boutique dans la base de données
    const boutique = await Boutique.create({
      nom,
      adresse,
      localisation,
      utilisateurId
    });

    res.status(201).json(boutique);
  } catch (error) {
    console.error('Erreur lors de la création de la boutique :', error);
    res.status(500).json({ error: 'Erreur lors de la création de la boutique' });
  }
}

// Méthode pour obtenir toutes les boutiques
async function getBoutiques(req, res) {
  try {
    // Récupérer toutes les boutiques de la base de données
    const boutiques = await Boutique.findAll();

    res.status(200).json(boutiques);
  } catch (error) {
    console.error('Erreur lors de la récupération des boutiques :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des boutiques' });
  }
}

// Méthode pour obtenir une boutique par son ID
async function getBoutiqueById(req, res) {
  const { id } = req.params;

  try {
    // Rechercher la boutique dans la base de données en fonction de l'ID
    const boutique = await Boutique.findByPk(id);

    if (boutique) {
      res.status(200).json(boutique);
    } else {
      res.status(404).json({ error: 'Boutique non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la boutique :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la boutique' });
  }
}

// Méthode pour mettre à jour une boutique
async function updateBoutique(req, res) {
  const { id } = req.params;

  try {
    // Rechercher la boutique dans la base de données en fonction de l'ID
    const boutique = await Boutique.findByPk(id);

    if (boutique) {
      // Mettre à jour les champs de la boutique
      await boutique.update(req.body);

      res.status(200).json(boutique);
    } else {
      res.status(404).json({ error: 'Boutique non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la boutique :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la boutique' });
  }
}

// Méthode pour supprimer une boutique
async function deleteBoutique(req, res) {
  const { id } = req.params;

  try {
    // Rechercher la boutique dans la base de données en fonction de l'ID
    const boutique = await Boutique.findByPk(id);

    if (boutique) {
      // Supprimer la boutique de la base de données
      await boutique.destroy();

      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Boutique non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la boutique :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la boutique' });
  }
}

module.exports = {
  createBoutique,
  getBoutiques,
  getBoutiqueById,
  updateBoutique,
  deleteBoutique
};
