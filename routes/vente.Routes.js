const express = require('express');
const router = express.Router();
const VenteController = require('../controllers/venteControllers');

// Route pour créer une nouvelle vente
router.post('/ventes', VenteController.createVente);

// Route pour récupérer toutes les ventes
router.get('/ventes', VenteController.getAllVentes);

// Autres routes pour mettre à jour, supprimer une vente, etc.
router.get('/ventes/:venteId', VenteController.getVenteById);

module.exports = router;
