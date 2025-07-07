const Catway = require('../models/catway');


exports.createCatway = async (req, res) => {
  const { catwayNumber, type, catwayState, boatName } = req.body;
  try {
    const catway = new Catway({ catwayNumber, type, catwayState, boatName });
    await catway.save();
    res.status(201).json(catway);
    res.status(201).json({ message: 'Catway créé avec succès' });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du catway' });
  }
};


//Modification d'un catway
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);

    if (!catway) return res.status(404).json({ msg: 'Catway introuvable' });
    if (catway.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Non autorisé' });

    const updated = await Catway.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

//supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);

    if (!catway) return res.status(404).json({ msg: 'Catway introuvable' });
    if (catway.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Non autorisé' });

    await catway.remove();
    res.json({ msg: 'Catway supprimée' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};


//Liste de tous les catways 
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catways' });
  }
};

//Liste de tous les catways disponibles
exports.getCatways = async (req, res) => {
  const catwaysD = await Catway.find({ catwayState: true });
  res.json(catwaysD);
};
