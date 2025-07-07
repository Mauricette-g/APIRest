
const express = require('express');
const connectDB = require('./db/mongo');
require('dotenv').config();

const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

connectDB();

const indexRouter = require('./routes/index');

const path = require('path');

app.use(express.static(path.join(__dirname, 'frontend')));


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


module.exports = app;

