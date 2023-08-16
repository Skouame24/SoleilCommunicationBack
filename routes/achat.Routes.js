const express = require('express');
const router = express.Router();
const AchatController = require('../controllers/achatControllers');

// Route pour créer un nouvel achat
router.post('/achats', AchatController.createAchat);

// Route pour récupérer tous les achats
router.get('/achats', AchatController.getAllAchats);

// Route pour récupérer un achat par son ID
router.get('/achats/:achatId', AchatController.getAchatById);

// Autres routes pour mettre à jour, supprimer un achat, etc.

module.exports = router;
