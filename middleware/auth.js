const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
require('dotenv').config();

//const authenticateToken = (req, res, next) => {
  //const token = req.headers['authorization']?.split(' ')[1];
  //if (!token) return res.status(401).json({ message: 'Token requis' });

  //jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
   // if (err) return res.status(403).json({ message: 'Token invalide' });
    //req.user = user;
    //next();
  //});
  
//};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requis' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
};


const isAdmin = async (req, res, next) => {
  const u = await User.findById(req.user.id);
  if (!u.isAdmin) return res.status(403).send('Accès interdit');
  next();
};

module.exports = {authenticateToken,isAdmin}