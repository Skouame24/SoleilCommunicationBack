const { Utilisateur } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clé secrète pour le jeton JWT (remplacez cela par une clé plus sûre dans un environnement de production)
const secretKey = 'mySecretKey';

// Méthode pour créer un utilisateur
async function createUser(req, res) {
  try {
    const { nom, prenom, email, contact, login, motdepasse } = req.body;

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    // Créer un nouvel utilisateur dans la base de données avec le mot de passe haché
    const user = await Utilisateur.create({
      nom,
      prenom,
      email,
      contact,
      login,
      motdepasse: hashedPassword
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
}

// Méthode pour générer un jeton JWT
function generateJWT(user) {
  const payload = {
    id: user.id,
    login: user.login
  };

  const options = {
    expiresIn: '24h' // Durée de validité du jeton (7 heures dans cet exemple)
  };

  return jwt.sign(payload, secretKey, options);
}

// Méthode pour gérer la connexion de l'utilisateur
async function loginUser(req, res) {
  try {
    const { login, motdepasse } = req.body;

    // Rechercher l'utilisateur dans la base de données en fonction du login
    const user = await Utilisateur.findOne({
      where: {
        login: login
      }
    });

    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (user && await bcrypt.compare(motdepasse, user.motdepasse)) {
      // Connexion réussie, générer le jeton JWT
      const token = generateJWT(user);
      res.status(200).json({ message: 'Connexion réussie', token: token });
    } else {
      // Identifiants invalides
      res.status(401).json({ error: 'Identifiants invalides' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
}

// Méthode pour obtenir les informations de l'utilisateur à partir du token
async function getUserByToken(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token d\'authentification manquant' });
  }

  jwt.verify(token, secretKey, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Token d\'authentification invalide' });
    }

    const userId = decodedToken.id;

    try {
      // Rechercher l'utilisateur dans la base de données en fonction de l'ID
      const user = await Utilisateur.findByPk(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  });
}
// Méthode pour mettre à jour les informations de l'utilisateur
async function updateUser(req, res) {
  const { id } = req.params;
  const { nom, prenom, email, contact, motdepasse } = req.body;

  try {
    // Rechercher l'utilisateur dans la base de données en fonction de l'ID
    const user = await Utilisateur.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations de l'utilisateur
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.email = email || user.email;
    user.contact = contact || user.contact;

    // Si un nouveau mot de passe est fourni, le hacher et le mettre à jour
    if (motdepasse) {
      const hashedPassword = await bcrypt.hash(motdepasse, 10);
      user.motdepasse = hashedPassword;
    }

    // Enregistrer les modifications dans la base de données
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
}
// Méthode pour obtenir un utilisateur par son ID
async function getUserById(req, res) {
  const { id } = req.params;

  try {
    // Rechercher l'utilisateur dans la base de données en fonction de l'ID
    const user = await Utilisateur.findByPk(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
}
// Méthode pour mettre à jour le mot de passe de l'utilisateur
async function updatePassword(req, res) {
  const { id } = req.params;
  const { ancienMotDePasse, nouveauMotDePasse, confirmationMotDePasse } = req.body;

  try {
    // Rechercher l'utilisateur dans la base de données en fonction de l'ID
    const user = await Utilisateur.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'ancien mot de passe correspond
    const isMatch = await bcrypt.compare(ancienMotDePasse, user.motdepasse);

    if (!isMatch) {
      return res.status(401).json({ error: 'Ancien mot de passe incorrect' });
    }

    // Vérifier si le nouveau mot de passe et la confirmation correspondent
    if (nouveauMotDePasse !== confirmationMotDePasse) {
      return res.status(400).json({ error: 'Le nouveau mot de passe et la confirmation ne correspondent pas' });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    user.motdepasse = hashedPassword;

    // Enregistrer les modifications dans la base de données
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
  }
}



module.exports = {
  createUser,
  loginUser,
  getUserByToken,
  getUserById,
  updateUser,
  updatePassword

};
