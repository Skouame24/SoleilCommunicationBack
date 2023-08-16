const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleControllers');

router.post('/articles', ArticleController.createArticle);
router.get('/articles', ArticleController.getAllArticles);
router.get('/articles/:id', ArticleController.getArticleById);
router.delete('/articles/:id', ArticleController.deleteArticleById); // Nouvelle route pour la suppression
router.get('/articles/category/:categoryId', ArticleController.getArticlesByCategory);

module.exports = router;
