const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/auth'); // Importez le middleware d'authentification

// Route de création d'utilisateur (non sécurisée)
router.post('/users', UserController.createUser);

// Route pour obtenir des informations d'utilisateur par ID (non sécurisée)
router.get('/users/:id', UserController.getUserById);

// Route de connexion (non sécurisée)
router.post('/login', UserController.loginUser);

// Route de mise à jour des informations de l'utilisateur (sécurisée avec authMiddleware)
router.put('/profile/:id', authMiddleware, UserController.updateUser);

// Exemple de route sécurisée en utilisant le middleware d'authentification
router.get('/profile', authMiddleware, (req, res) => {
  // Vous pouvez maintenant accéder aux informations de l'utilisateur via req.user
  res.status(200).json(req.user);
});

// Mettre à jour le mot de passe de l'utilisateur (requiert une authentification)
router.put('/profile/:id/password', authMiddleware, UserController.updatePassword);
// Ajoutez ici d'autres routes pour d'autres fonctionnalités (ventes, achats, etc.)


module.exports = router;
