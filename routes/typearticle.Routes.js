const express = require('express');
const router = express.Router();
const TypeArticleController = require('../controllers/typearticleControllers');

// Créer un nouveau type d'article
router.post('/type', TypeArticleController.createTypeArticle);

// Obtenir tous les types d'articles
router.get('/type', TypeArticleController.getAllTypeArticles);

// Obtenir un type d'article par son ID
router.get('/type/:id', TypeArticleController.getTypeArticleById);

module.exports = router;
