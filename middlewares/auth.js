const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models');

const secretKey = 'mySecretKey';

// Middleware pour vérifier l'authentification de l'utilisateur
async function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'En-tête d\'autorisation manquant' });
  }
  
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'authentification manquant' });
  }

  jwt.verify(token, secretKey, async (err, decodedToken) => {
    console.log(err);
    if (err) {
      return res.status(401).json({ error: 'Token d\'authentification invalide' });
    }
    
    try {
      const userId = decodedToken.id;
      const user = await Utilisateur.findByPk(userId);

      if (user) {
        req.user = user; // Ajoute l'utilisateur décodé à l'objet req
        next(); // Passez à l'étape suivante
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur' });
    }
  });
}

module.exports = authenticate;
