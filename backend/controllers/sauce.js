const sauceSchema = require("../database/models/sauce");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new sauceSchema({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  sauceSchema
    .updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: require.params.id }
    )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch(() => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauceSchema.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new Error("Objet non trouvé !"),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      res.status(401).json({ error: new Error("Requête non authorisée !") });
    }
    sauceSchema
      .deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};

exports.getOneSauce = (req, res, next) => {
  sauceSchema
    .findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  sauceSchema
    .find()
    .then((sauce) => res.status(200).json())
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////
//Je suis sûr de rien ici
////////////////////////////
exports.likeSauce = (req, res, next) => {
  sauceSchema.findById(req.params.id, function (error, theUser) {
    if (error) {
      console.log(error);
    } else {
      theUser.likes += 1;
      theUser.save();
      console.log(theUser.likes);
      res.send({ likeCount: theUser.likes });
    }
  });
};
