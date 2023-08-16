const { Client } = require('../models');

const ClientController = {
  createClient: async (req, res) => {
    try {
      const { nom, prenom, email, contact, localisation } = req.body;

      const client = await Client.create({ nom, prenom, email, contact, localisation });

      res.status(201).json({ message: 'Client créé avec succès', client });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la création du client', error });
    }
  },

  getClient: async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);

      if (client) {
        res.status(200).json({ client });
      } else {
        res.status(404).json({ message: 'Client non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des informations du client', error });
    }
  },

  updateClient: async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, prenom, email, contact, localisation } = req.body;

      const [updatedRowCount, updatedClients] = await Client.update(
        { nom, prenom, email, contact, localisation },
        { where: { id }, returning: true }
      );

      if (updatedRowCount > 0) {
        res.status(200).json({ message: 'Client mis à jour avec succès', client: updatedClients[0] });
      } else {
        res.status(404).json({ message: 'Client non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du client', error });
    }
  },

  deleteClient: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Client.destroy({ where: { id } });

      if (deletedRowCount > 0) {
        res.status(200).json({ message: 'Client supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Client non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du client', error });
    }
  },

  getAllClients: async (req, res) => {
    try {
      const clients = await Client.findAll();

      res.status(200).json({ clients });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clients', error });
    }
  },
};

module.exports = ClientController;
