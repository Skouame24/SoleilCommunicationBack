// Importez les modules et fichiers nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.Routes');
const boutiqueRoutes = require('./routes/boutique.Routes');
const categorieRoutes = require('./routes/categorie.Routes');
const articleRoutes = require('./routes/article.Routes'); // Importez les routes pour les articles
const venteRoutes = require('./routes/vente.Routes'); // Importez les routes pour les ventes
const clientRoutes = require('./routes/client.Routes')
const fournisseursRouter = require('./routes/fournisseur.Routes');
const achatRoutes = require('./routes/achat.Routes')
const typearticleRoutes = require('./routes/typearticle.Routes')




const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api', boutiqueRoutes);
app.use('/api', categorieRoutes);
app.use('/api', articleRoutes); // Utilisez les routes pour les articles
app.use('/api', venteRoutes); // Utilisez les routes pour les ventes
app.use('/api', clientRoutes);
app.use('/api', fournisseursRouter);
app.use('/api', achatRoutes); // Utilisez les routes pour les articles
app.use('/api', typearticleRoutes)


// Start the server
const port = process.env.PORT || 5001;
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
