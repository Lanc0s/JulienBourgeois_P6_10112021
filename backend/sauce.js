const mongo = require("./mongo");
const app = express();
const sauceSchema = require("./database/models/sauce");

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
