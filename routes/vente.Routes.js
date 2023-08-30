const express = require('express');
const router = express.Router();
const VenteController = require('../controllers/venteControllers');

// Route for creating a new sale
router.post('/ventes', VenteController.createVente);

// Route for getting all sales
router.get('/ventes', VenteController.getAllVentes);

// Route for updating a sale by ID
router.put('/ventes/:venteId', VenteController.updateVente);

// Route for getting a specific sale by ID
router.get('/ventes/:venteId', VenteController.getVenteById);

// Other routes for deleting a sale, etc.

module.exports = router;
