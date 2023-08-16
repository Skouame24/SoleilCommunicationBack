const express = require('express');
const router = express.Router();
const BoutiqueController = require('../controllers/boutiqueControllers');

// Route pour créer une boutique
router.post('/boutiques', BoutiqueController.createBoutique);

// Route pour obtenir toutes les boutiques
router.get('/boutiques', BoutiqueController.getBoutiques);

// Route pour obtenir une boutique par son ID
router.get('/boutiques/:id', BoutiqueController.getBoutiqueById);

// Route pour mettre à jour une boutique
router.put('/boutiques/:id', BoutiqueController.updateBoutique);

// Route pour supprimer une boutique
router.delete('/boutiques/:id', BoutiqueController.deleteBoutique);

module.exports = router;
