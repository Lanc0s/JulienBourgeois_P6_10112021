const sauceSchema = require("../database/models/sauce");
const fs = require("fs");

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
  //là on test que req.file is true, si oui première {}, si non {}
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  sauceSchema
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        res.status(404).json({ error: new Error("No such sauce!") });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({ error: new Error("Unauthorized request!") });
      }
      const filename = sauce.imageUrl.split("/images/")[1];
      //l'image a changée, il faut donc suprimer l'ancienne et unlink n'appelle pas de funtion callback
      //req.file est défini si l'image a changée
      if (req.file && filename !== req.file.filename) {
        fs.unlink(`images/${filename}`, () => {});
      }
      sauceSchema
        .updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauceSchema.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      sauceSchema
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
    });
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
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.feedBackSauce = async (req, res, next) => {
  const { userId, like } = req.body;
  const { id } = req.params;

  switch (like) {
    case 1:
      return sauceSchema
        .updateOne(
          { _id: id },
          //mongoose fonction  https://docs.mongodb.com/manual/reference/operator/update/push/
          { $push: { usersLiked: userId }, $inc: { likes: 1 } }
        )
        .then(() => res.status(200).json({ message: "Liké !" }))
        .catch((error) => res.status(400).json({ error }));
    case 0:
      const sauce = await sauceSchema.findOne({ _id: id });
      if (sauce.usersLiked.includes(userId)) {
        return sauceSchema
          .updateOne(
            { _id: id },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
          .then(() => res.status(200).json({ messages: "Unliked !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (sauce.usersDisliked.includes(userId)) {
        return sauceSchema
          .updateOne(
            { _id: id },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
          .then(() => res.status(200).json({ message: "Undisliked !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res
          .status(400)
          .json({ error: "The user did not five a feedback yet" });
      }

    case -1:
      return sauceSchema
        .updateOne(
          { _id: id },
          { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
        )
        .then(() => res.status(200).json({ message: "Disliked !" }))
        .catch((error) => res.status(400).json(error));
    default:
      res.status(400).json({ message: "Mayday" });
  }
};
