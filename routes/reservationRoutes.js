const express = require('express');
//const router = express.Router();
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth').authenticateToken;
const reservationController = require('../controllers/reservationController');


router.get('/', auth, reservationController.getAllReservations);
router.post('/faire-reservation', auth, reservationController.createReservation);
router.put('/:id/modifier', auth, reservationController.updateReservation);     // Modifier
router.delete('/:id/supprimer', auth, reservationController.deleteReservation);  // Supprimer

module.exports = router;
