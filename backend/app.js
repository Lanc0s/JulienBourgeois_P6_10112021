const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("./mongo");
mongo();

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

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

app.use("/api/sauce", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
