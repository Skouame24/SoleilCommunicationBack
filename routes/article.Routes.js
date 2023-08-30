const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleControllers');

router.post('/articles', ArticleController.createArticle);
router.get('/articles', ArticleController.getAllArticles);
router.get('/articles/:id', ArticleController.getArticleById);
router.delete('/articles/:id', ArticleController.deleteArticleById);
router.get('/articles/category/:categoryId', ArticleController.getArticlesByCategory);
router.put('/articles/restored/:id', ArticleController.restoreArticleById);
router.get('/articles/deleted', ArticleController.getDeletedArticles); // Nouvelle route

module.exports = router;
