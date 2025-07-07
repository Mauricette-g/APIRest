const express = require('express');
const router = express.Router();
const authController= require('../controllers/authController');


router.post('/admin', authController.creAdmin);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

