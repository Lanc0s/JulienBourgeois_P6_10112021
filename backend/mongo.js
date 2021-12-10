const mongoose = require("mongoose");

require("dotenv").config();

module.exports = () => {
  mongoose
    .connect(`${process.env.DB_CONNECTION_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("FATAL : Connexion à MongoDB échouée !"));
};
