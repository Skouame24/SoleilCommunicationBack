const express = require('express');
const router = express.Router();
const CategorieController = require('../controllers/categorieControllers');

// Route pour créer une nouvelle catégorie
router.post('/categories', CategorieController.createCategorie);

// Route pour récupérer toutes les catégories
router.get('/categories', CategorieController.getAllCategories);

// Autres routes pour mettre à jour, supprimer une catégorie, etc.
router.get('/categories/:id', CategorieController.getCategorieById);


module.exports = router;
