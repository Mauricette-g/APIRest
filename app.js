
const express = require('express');
const connectDB = require('./db/mongo');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const indexRouter = require('./routes/index');


// Routes
// Définition des routes principales
app.use('/', indexRouter);
//app.use('/users', usersRouter); // Ex : route REST pour les utilisateurs
app.use('/api', require('./routes/authRoutes'));
app.use('/api/catways', require('./routes/catwayRoutes'));



// Middleware pour les erreurs 404 (route non trouvée)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


const path = require('path');

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

module.exports = app;

