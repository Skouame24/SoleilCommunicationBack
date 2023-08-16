const express = require('express');
const router = express.Router();
const FournisseurController = require('../controllers/fournisseurControllers');

// Créer un nouveau fournisseur
router.post('/fournisseur', FournisseurController.createFournisseur);

// Récupérer les informations d'un fournisseur
router.get('/fournisseur/:id', FournisseurController.getFournisseur);

// Mettre à jour un fournisseur
router.put('/fournisseur/:id', FournisseurController.updateFournisseur);

// Supprimer un fournisseur
router.delete('/fournisseur/:id', FournisseurController.deleteFournisseur);

// Lire tous les fournisseurs
router.get('/fournisseur', FournisseurController.getAllFournisseurs);

module.exports = router;
