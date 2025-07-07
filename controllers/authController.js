const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//fontion créer un utilisateur admin



// Créer un utilisateur admin
exports.creAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    // Crée un utilisateur avec isAdmin = true
    user = new User({name, email, password, isAdmin: true });
    await user.save();

    // Crée un token JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
    );

    res.status(201).json({
      message: 'Admin créé avec succès',
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};




//Fonction inscription
exports.register = async (req, res) => {
  const { name, email, password} = req.body;
  console.log("Données reçues:", req.body);
  try {
    const user = new User({ name, email, password});
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ message: err.message + 'Erreur lors de la création de l\'utilisateur' + name });
  }
};


//Fonction connexion

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifie que l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    // Génère un token JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Connexion réussie',
      token
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

