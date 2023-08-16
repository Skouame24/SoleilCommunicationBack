const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientControllers');

// Route pour créer un nouveau client
router.post('/clients', ClientController.createClient);

// Route pour récupérer tous les clients
router.get('/clients', ClientController.getAllClients);

// Route pour récupérer les informations d'un client
router.get('/clients/:id', ClientController.getClient);

// Route pour mettre à jour un client
router.put('/clients/:id', ClientController.updateClient);

// Route pour supprimer un client
router.delete('/clients/:id', ClientController.deleteClient);

module.exports = router;
