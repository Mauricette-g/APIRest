const express = require('express');
const router = express.Router();
const reservationsRouter = require('./reservationRoutes');
const auth = require('../middleware/auth').authenticateToken;
const isAdmin = require('../middleware/auth').isAdmin;
const catwayController = require('../controllers/catwayController');


router.get('/', auth, isAdmin, catwayController.getAllCatways);  //liste de tous les catways
router.get('/dispo', catwayController.getCatways);  //liste des catways disponibles
router.post('/create-catway', auth, isAdmin, catwayController.createCatway);  // créer un catway
router.put('/:id', auth,isAdmin, catwayController.updateCatway);  // Modifier un catway
router.delete('/:id', auth, isAdmin, catwayController.deleteCatway);  // Supprimer un catway
router.use('/:id/reservations',auth, reservationsRouter);

module.exports = router;
