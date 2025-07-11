const Catway = require('../models/catway');


exports.createCatway = async (req, res) => {
  const { catwayNumber, type, catwayState, boatName } = req.body;
  try {
    const catway = new Catway({ catwayNumber, type, catwayState, boatName, user: req.user.id });
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
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (updateFields.user) delete updateFields.user;

    // Chercher la catway
    const catway = await Catway.findById(id);
    if (!catway) {
      return res.status(404).json({ msg: 'Catway introuvable' });
    }

    // Mettre à jour
    const updated = await Catway.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};


//supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {

    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ msg: 'Catway introuvable' });
    }

    await Catway.findByIdAndDelete(req.params.id); 
    return res.json({ msg: 'Catway supprimée avec succès' });
  } catch (err) {
    return res.status(500).json({ msg: 'Erreur serveur', error: err.message });
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
