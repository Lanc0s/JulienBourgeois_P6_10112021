const express = require("express");
const router = express.Router();

const sauceSchema = require("../database/models/sauce");

//capture & enregistre les sauces dans la DB
router.post("/", (req, res, next) => {
  delete req.body._id;
  const sauce = new sauceSchema({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }));
});

//Renvoie un tableau des sauces de la DB
router.get("/ ", (req, res, next) => {
  sauceSchema
    .find()
    .then((sauce) => res.status(200).json())
    .catch((error) => res.status(400).json({ error }));
});

router.get("/", (req, res, next) => {
  //
});

//Sélectionne une sauce en particulier via le param :id
router.get("/ :id", (req, res, next) => {
  sauceSchema
    .findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

router.put("/ :id", (req, res, next) => {
  sauceSchema
    .updateOne({ _id: req.params.id }, { ...req.body, _id: require.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch(() => res.status(400).json({ error }));
});

router.delete("/ :id", (req, res, next) => {
  sauceSchema
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
});

router.post("/ :id/like", (req, res, next) => {
  //
});

module.exports = router;
