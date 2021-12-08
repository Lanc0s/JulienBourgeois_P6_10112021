const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Lancos:NbUU1HRn8X560CSO@cluster0.vi1wq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());
app.get("/api/sauces/", (req, res, next) => {
  //
});

app.get("/api/sauces", (req, res, next) => {
  //
});

app.post("/api/sauces", (req, res, next) => {
  //
});

app.get("/api/sauces/:id", (req, res, next) => {
  //
});

app.put("/api/sauces/:id", (req, res, next) => {
  //
});

app.delete("/api/sauces/:id", (req, res, next) => {
  //
});

app.post("/api/sauces/:id/like", (req, res, next) => {
  //
});

module.exports = app;
