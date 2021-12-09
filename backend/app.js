const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("./mongo");
mongo();

app.use(express.json());

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

app.post("/api/auth/signup", (req, res, next) => {
  //
});

app.post("/api/auth/login", (req, res, next) => {
  //
});

module.exports = app;
