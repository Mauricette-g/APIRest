const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

exports.createReservation = async (req, res) => {
  const { catwayId, checkIn, checkOut } = req.body;
  const catway = await Catway.findById(catwayId);
  console.log(catway,catway)
  if (catway.catwayState==false) return res.status(400).send('catway non disponible');
  await Reservation.create({userId: req.user.id , checkIn, checkOut });
  catway.catwayState = false;
  await catway.save();
  res.json({ message: 'Réservation confirmée' });
};
 


//Modification d'une réservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ msg: 'Réservation introuvable' });
    if (reservation.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Non autorisé' });

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

//supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ msg: 'Réservation introuvable' });
    if (reservation.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Non autorisé' });

    await reservation.remove();
    res.json({ msg: 'Réservation supprimée' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

//Liste des réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
  }
};

